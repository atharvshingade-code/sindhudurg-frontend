import { useEffect, useState } from "react";
import { API_BASE } from "./config";

export default function TalukaTable({ month, year }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (!month || !year) return;

    fetch(`${API_BASE}/district/report?month=${month}&year=${year}`)
      .then(r => r.json())
      .then(setRows);
  }, [month, year]);

  // group rows by category
  const grouped = rows.reduce((acc, r) => {
    if (!acc[r.category]) acc[r.category] = [];
    acc[r.category].push(r);
    return acc;
  }, {});

  // calculate totals per category
  const categoryTotals = {};

  rows.forEach(r => {
    if (!categoryTotals[r.category]) {
      categoryTotals[r.category] = {
        sanctioned: 0,
        filled: 0,
        vacant: 0
      };
    }

    categoryTotals[r.category].sanctioned += r.sanctioned;
    categoryTotals[r.category].filled += r.filled;
    categoryTotals[r.category].vacant += r.vacant;
  });

  return (
    <div>
      {Object.keys(grouped).map(category => {
        const total = categoryTotals[category];
        const vacancyPercent =
          total.sanctioned === 0
            ? 0
            : ((total.vacant / total.sanctioned) * 100).toFixed(2);

        return (
          <div key={category} className="category-block">
            <h3 className="category-title">{category}</h3>

            <table className="data-table" border="1">
              <thead>
                <tr>
                  <th>Taluka</th>
                  <th>Sanctioned</th>
                  <th>Filled</th>
                  <th>Vacant</th>
                  <th>Vacancy %</th>
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
                    <td>{r.vacancy_percent}%</td>
                  </tr>
                ))}

                {/* TOTAL ROW */}
                <tr style={{ fontWeight: "bold", background: "#f2f2f2" }}>
                  <td>Total</td>
                  <td>{total.sanctioned}</td>
                  <td>{total.filled}</td>
                  <td>{total.vacant}</td>
                  <td>{vacancyPercent}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
