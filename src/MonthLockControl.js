import { useEffect, useState } from "react";
import { API_BASE } from "./config";

export default function MonthLockControl({ month, year }) {
  const [locked, setLocked] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadStatus = async () => {
    const res = await fetch(
      `${API_BASE}/admin/month-status?month=${month}&year=${year}`
    );
    const data = await res.json();
    setLocked(data.locked);
    setLoading(false);
  };

  useEffect(() => {
    loadStatus();
  }, [month, year]);

  const toggle = async () => {
    await fetch(`${API_BASE}/admin/${locked ? "unlock-month" : "lock-month"}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ month, year })
    });

    loadStatus();
  };

  if (loading) return <p>Checking month status…</p>;

  return (
    <div
      style={{
        padding: "12px",
        marginBottom: "15px",
        background: locked ? "#ffebee" : "#e8f5e9",
        border: "1px solid",
        borderColor: locked ? "#c62828" : "#2e7d32",
        borderRadius: "6px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <strong>
        Month Status: {locked ? "🔒 Locked" : "🟢 Open for Talukas"}
      </strong>

      <button
        onClick={toggle}
        style={{
          padding: "8px 16px",
          background: locked ? "#2e7d32" : "#c62828",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        {locked ? "Unlock Month" : "Lock Month"}
      </button>
    </div>
  );
}
