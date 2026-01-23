import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import Login from "./Login";
import DistrictSummary from "./DistrictSummary";
import TalukaTable from "./TalukaTable";

import MonthSelector from "./MonthSelector";
import TalukaForm from "./TalukaForm";
import MonthLockControl from "./MonthLockControl";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [month, setMonth] = useState(null);   // 🔑 START NULL
  const [year, setYear] = useState(2026);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  // ---------- AUTH ----------
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // ---------- LOAD PROFILE ----------
  useEffect(() => {
    if (!user) return;

    supabase.rpc("get_my_profile").then(({ data, error }) => {
      if (error) console.error(error);
      else setProfile(data[0]);
    });
  }, [user]);

  if (!user) return <Login setUser={setUser} />;
  if (!profile) return <p>Loading profile…</p>;

  // =========================================================
  // TALUKA VIEW
  // =========================================================
  if (profile.role === "taluka") {
    return (
      <div style={{ padding: 30 }}>
        <div style={{ textAlign: "right" }}>
          <button
            onClick={logout}
            style={{
              padding: "6px 14px",
              background: "#b71c1c",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>

        <h2>Taluka Monthly Data Entry</h2>

        <MonthSelector
          month={month}
          setMonth={setMonth}
          year={year}
          setYear={setYear}
        />

        {!month && (
          <p style={{ color: "#b71c1c", marginTop: 20 }}>
            Please select a month to enter data
          </p>
        )}

        {month && (
          <TalukaForm
            talukaId={profile.taluka_id}
            month={month}
            year={year}
          />
        )}
      </div>
    );
  }

  // =========================================================
  // DISTRICT ADMIN VIEW
  // =========================================================
  return (
    <div className="container">
      <div style={{ textAlign: "right" }}>
        <button
          onClick={logout}
          style={{
            padding: "6px 14px",
            background: "#b71c1c",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>

      <h1>
        Sindhudurg District Education Office<br />
        Monthly Staff Vacancy Report
      </h1>

      <MonthSelector
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
      />

      {!month && (
        <p
          style={{
            textAlign: "center",
            marginTop: 30,
            fontSize: 18,
            color: "#b71c1c",
            fontWeight: "bold"
          }}
        >
          Please select a month to view reports
        </p>
      )}

      {month && (
        <>
          <p style={{ textAlign: "center" }}>
            Month: {month} / {year}
          </p>

          <MonthLockControl month={month} year={year} />

          <button onClick={() => window.print()}>
            Download Report
          </button>

          {/*<div className="card">
            <DistrictSummary month={month} year={year} />
          </div>*/}

          <div className="card">
            <TalukaTable month={month} year={year} />
          </div>

          
        </>
      )}
    </div>
  );
}

export default App;
