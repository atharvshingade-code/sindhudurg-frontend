import { useEffect, useState } from "react";
import { API_BASE } from "./config";

export default function DistrictSummary({ month, year }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!month || !year) return;

    fetch(`${API_BASE}/district/summary?month=${month}&year=${year}`)
      .then(res => res.json())
      .then(d => setData(d[0]));
  }, [month, year]);

  if (!data) return <p>Loading summary...</p>;

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
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
