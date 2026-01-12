import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export default function TalukaForm({ talukaId }) {
  const [rows, setRows] = useState([]);     // ALWAYS array
  const [loading, setLoading] = useState(true);

  const month = 10;
  const year = 2025;

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const {
        data: { session }
      } = await supabase.auth.getSession();

      if (!session) {
        setRows([]);
        setLoading(false);
        return;
      }

      const res = await fetch(
        `${API_BASE}/taluka/form-data?month=${month}&year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`
          }
        }
      );

      const data = await res.json();

      // 🔒 HARD GUARD
      if (Array.isArray(data)) {
        setRows(data);
      } else {
        console.error("Backend did not return array:", data);
        setRows([]);
      }

      setLoading(false);
    };

    if (talukaId) load();
  }, [talukaId]);

  const submit = async () => {
  const { data: sessionData } = await supabase.auth.getSession();

  if (!sessionData.session) {
    alert("Not logged in");
    return;
  }

  const res = await fetch("${API_BASE}/taluka/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionData.session.access_token
    },
    body: JSON.stringify({
      month,
      year,
      data: rows.map(r => ({
        category_id: r.category_id,
        filled: Number(r.filled || 0)
      }))
    })
  });

  const out = await res.json();

  if (res.ok) {
    alert("Data submitted successfully");
  } else {
    alert(out.error || "Submission failed");
  }
};


  // -------- RENDER SAFETY --------
  if (loading) return <p>Loading form…</p>;

  if (!Array.isArray(rows)) {
    return <p>Invalid data received</p>;
  }

  if (rows.length === 0) {
    return <p>No sanctioned posts configured for this taluka.</p>;
  }

  return (
    <div className="card">
      <h2>Monthly Data Entry</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Category</th>
            <th>Sanctioned</th>
            <th>Filled</th>
            <th>Vacant</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.category}</td>
              <td>{r.sanctioned}</td>
              <td>
                <input
                  type="number"
                  value={r.filled ?? ""}
                  onChange={e => {
                    const copy = [...rows];
                    copy[i].filled = Number(e.target.value);
                    setRows(copy);
                  }}
                />
              </td>
              <td>{r.vacant}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
  onClick={submit}
  style={{
    marginTop: "15px",
    padding: "10px 20px",
    background: "#0d47a1",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  }}
>
  Submit Data
</button>

    </div>
  );
}
