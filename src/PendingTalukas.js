import { useEffect, useState } from "react";
import { API_BASE } from "./config";


export default function PendingTalukas() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/district/pending?month=10&year=2025`)
      .then(res => res.json())
      .then(setList);
  }, []);

  return (
    <div className="pending-box">
      <h3>Talukas that did NOT submit</h3>
      <ul>
        {list.map((t, i) => (
          <li key={i}>{t.taluka}</li>
        ))}
      </ul>
    </div>
  );
}
