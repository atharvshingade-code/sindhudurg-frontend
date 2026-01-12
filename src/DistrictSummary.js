import { useEffect, useState } from "react";
import { API_BASE } from "./config";


export default function DistrictSummary() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("${API_BASE}/district/summary?month=10&year=2025")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Loading…</p>;

  const row = data[0];

  return (
    <div className="summary-box">
        <div>
            <h3>Sanctioned</h3>
            <h1>{data.total_sanctioned}</h1>
        </div>
        <div>
            <h3>Filled</h3>
            <h1>{data.total_filled}</h1>
        </div>
        <div>
            <h3>Vacant</h3>
            <h1 style={{ color: "red" }}>{data.total_vacant}</h1>
        </div>
    </div>

  );
}
