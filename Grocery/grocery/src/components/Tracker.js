import { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";

export default function Tracker() {
  const { categoryBudgets, totalSpent } = useContext(BudgetContext);

  // ✅ TOTAL BUDGET CALCULATION
  const totalBudget = Object.values(categoryBudgets || {}).reduce(
    (sum, val) => sum + Number(val || 0),
    0
  );

  const percentage =
    totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  const remaining = totalBudget - totalSpent;

  return (
    <div>
      <h2>💰 Tracker</h2>
      <p>Daily: ₹{totalSpent}</p>

      <h3>🎯 Budget Progress</h3>

      <div
        style={{
          background: "#ddd",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            background: percentage > 100 ? "red" : "green",
            padding: "10px",
            color: "white",
          }}
        >
          {percentage.toFixed(1)}%
        </div>
      </div>

      {/* ✅ FIXED */}
      <p>Remaining: ₹{remaining >= 0 ? remaining : 0}</p>
    </div>
  );
}