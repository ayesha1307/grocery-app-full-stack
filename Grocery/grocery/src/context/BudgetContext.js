import { createContext, useState, useEffect } from "react";

export const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [categoryBudgets, setCategoryBudgets] = useState(() => {
    const saved = localStorage.getItem("budgets");
    return saved
      ? JSON.parse(saved)
      : {
          Fruits: 0,
          Vegetables: 0,
          Dairy: 0,
          Snacks: 0,
        };
  });

  useEffect(() => {
  fetch("http://localhost:8080/api/items")
    .then((res) => res.json())
    .then((data) => setItems(data))
     .catch(() => alert("❌ Failed to load items"));
}, []);

  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("items");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ NEW: track if budget is confirmed
  const [isBudgetSet, setIsBudgetSet] = useState(() => {
    const saved = localStorage.getItem("budgets");
    return saved ? true : false;
  });

  // save data
  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(categoryBudgets));
  }, [categoryBudgets]);

  useEffect(() => {
  fetch("http://localhost:8080/api/items")
    .then(res => res.json())
    .then(data => setItems(data));
}, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  // totals
  const totalSpent = items.reduce((acc, item) => acc + item.price, 0);

  const categoryTotals = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.price;
    return acc;
  }, {});

  return (
    <BudgetContext.Provider
      value={{
        categoryBudgets,
        setCategoryBudgets,
        items,
        setItems,
        totalSpent,
        categoryTotals,
        isBudgetSet,
        setIsBudgetSet,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};