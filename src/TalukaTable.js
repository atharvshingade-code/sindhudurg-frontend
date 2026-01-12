import { useEffect, useState } from "react";

export default function TalukaTable({ month, year }) {
  const [rows, setRows] = useState([]);
  const [totals, setTotals] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/district/report?month=${month}&year=${year}`)
      .then(r => r.json())
      .then(setRows);

    fetch(`${API_BASE}/district/category-totals?month=${month}&year=${year}`)
      .then(r => r.json())
      .then(setTotals);
  }, [month, year]);

  // group rows by category
  const grouped = rows.reduce((acc, r) => {
    if (!acc[r.category]) acc[r.category] = [];
    acc[r.category].push(r);
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(grouped).map(category => (
        <div key={category} className="category-block">
          <h3 className="category-title">{category}</h3>

          <table className="data-table" border="1">
            <thead>
              <tr>
                <th>Taluka</th>
                <th>Sanctioned</th>
                <th>Filled</th>
                <th>Vacant</th>
              </tr>
            </thead>

            <tbody>
              {grouped[category].map((r, i) => (
                <tr key={i}>
                  <td>{r.taluka}</td>
                  <td>{r.sanctioned}</td>
                  <td>{r.filled}</td>
                  <td style={{ color: r.vacant > 0 ? "red" : "green" }}>
                    {r.vacant}
                  </td>
                </tr>
              ))}

              {totals
                .filter(t => t.category === category)
                .map((t, i) => (
                  <tr key={i} style={{ fontWeight: "bold", background: "#eee" }}>
                    <td>Total</td>
                    <td>{t.total_sanctioned}</td>
                    <td>{t.total_filled}</td>
                    <td>{t.total_vacant}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
