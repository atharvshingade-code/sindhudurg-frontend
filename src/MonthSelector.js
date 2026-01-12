export default function MonthSelector({ month, setMonth, year, setYear }) {
  return (
    <div className="month-bar">
      <select value={month} onChange={e => setMonth(e.target.value)}>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>

      <select value={year} onChange={e => setYear(e.target.value)}>
        <option value="2025">2025</option>
        <option value="2026">2026</option>
      </select>
    </div>
  );
}
