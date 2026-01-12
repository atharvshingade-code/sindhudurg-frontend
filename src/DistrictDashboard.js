import { useState } from "react";
import DistrictSummary from "../components/DistrictSummary";
import TalukaTable from "../components/TalukaTable";
import PendingTalukas from "../components/PendingTalukas";
import MonthSelector from "../components/MonthSelector";

export default function DistrictDashboard() {
  const [month, setMonth] = useState(10);
  const [year, setYear] = useState(2025);

  return (
    <div className="container">
      <h1>
        Sindhudurg District Education Office<br />
        Monthly Staff Vacancy Report
      </h1>

      <p style={{ textAlign: "center" }}>
        Month: {month} / {year}
      </p>

      <MonthSelector
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
      />

      <button onClick={() => window.print()}>Download Report</button>

      <div className="card">
        <DistrictSummary month={month} year={year} />
      </div>

      <div className="card">
        <TalukaTable month={month} year={year} />
      </div>

      <div className="card">
        <PendingTalukas month={month} year={year} />
      </div>
    </div>
  );
}
