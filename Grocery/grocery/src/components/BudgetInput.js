import { useContext, useState } from "react";
import { BudgetContext } from "../context/BudgetContext";

export default function BudgetInput() {
  const { setCategoryBudgets, setIsBudgetSet } =
    useContext(BudgetContext);

  const [budgets, setBudgets] = useState({
    Fruits: "",
    Vegetables: "",
    Dairy: "",
    Snacks: "",
  });

  const handleChange = (category, value) => {
    setBudgets({ ...budgets, [category]: value });
  };

  const handleSet = () => {
  const formatted = {};

  for (let key in budgets) {
    const value = Number(budgets[key]);

    if (!value || value <= 0) {
      alert(`⚠️ Enter valid budget for ${key}`);
      return;
    }

    formatted[key] = value;
  } // ✅ LOOP CLOSED HERE

  setCategoryBudgets(formatted);
  setIsBudgetSet(true);
};

  return (
    <div>
      <h2>💰 Set Category Budgets</h2>

      {Object.keys(budgets).map((cat) => (
        <div key={cat} style={{ marginBottom: "10px" }}>
          <label>{cat}</label>
          <input
            type="number"
            value={budgets[cat]}
            onChange={(e) => handleChange(cat, e.target.value)}
          />
        </div>
      ))}

      <button onClick={handleSet}>Set Budgets</button>
    </div>
  );
}