import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";

export default function ExpenseChart() {
  const { categoryTotals } = useContext(BudgetContext);

  const data = Object.keys(categoryTotals).map((cat) => ({
    name: cat,
    value: categoryTotals[cat],
  }));

  const COLORS = ["#4CAF50", "#FF9800", "#2196F3", "#F44336"];

  return (
    <div>
      <h3>📊 Spending Chart</h3>

      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}