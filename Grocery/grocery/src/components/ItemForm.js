import { useState, useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";

export default function ItemForm() {
  const { items, setItems, categoryBudgets, categoryTotals, isBudgetSet } =
    useContext(BudgetContext);

  const [category, setCategory] = useState("Fruits");

  const products = {
    Fruits: [
      { name: "Apple 🍎", price: 50 },
      { name: "Banana 🍌", price: 30 },
      { name: "Orange 🍊", price: 40 },
      { name: "Mango 🥭", price: 80 },
      { name: "Grapes 🍇", price: 60 },
      { name: "Pineapple 🍍", price: 90 },
    ],
    Vegetables: [
      { name: "Tomato 🍅", price: 20 },
      { name: "Potato 🥔", price: 25 },
      { name: "Onion 🧅", price: 30 },
      { name: "Carrot 🥕", price: 35 },
      { name: "Broccoli 🥦", price: 70 },
      { name: "Capsicum 🫑", price: 50 },
    ],
    Dairy: [
      { name: "Milk 🥛", price: 40 },
      { name: "Cheese 🧀", price: 80 },
      { name: "Butter 🧈", price: 60 },
      { name: "Paneer 🍽️", price: 90 },
      { name: "Curd 🥣", price: 30 },
      { name: "Yogurt 🍶", price: 35 },
    ],
    Snacks: [
      { name: "Chips 🍟", price: 20 },
      { name: "Chocolate 🍫", price: 50 },
      { name: "Biscuits 🍪", price: 15 },
      { name: "Popcorn 🍿", price: 30 },
      { name: "Namkeen 🥨", price: 25 },
      { name: "Cake 🍰", price: 70 },
    ],
  };

  // 🔒 BLOCK UI if budget not set
  if (!isBudgetSet) {
    return <p>⚠️ Please set your budget first to start shopping</p>;
  }

const addItem = (product) => {
  if (!isBudgetSet) {
    alert("⚠️ Please set budget first!");
    return;
  }

  const currentTotal = Number(categoryTotals[category] || 0);
  const budget = Number(categoryBudgets[category] || 0);

  if (!budget || budget <= 0) {
    alert(`⚠️ Budget not set for ${category}`);
    return;
  }

  if (currentTotal + product.price > budget) {
    alert(
      `🚨 Budget exceeded!\nLimit: ₹${budget}\nCurrent: ₹${currentTotal}`
    );
    return;
  }

  const newItem = {
    name: product.name,
    price: product.price,
    quantity: 1,
    category,
  };

  // ✅ SEND TO BACKEND
  fetch("http://localhost:8080/api/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItem),
  })
    .then((res) => res.json())
.then((savedItem) => {
  setItems([...items, savedItem]);
})
    .catch(() => {
      alert("❌ Failed to save item to backend");
    });
};

  return (
    <div>
      <h2>🛒 Shop</h2>

      {/* CATEGORY TABS */}
      <div className="tabs">
        {Object.keys(products).map((cat) => (
          <button
            key={cat}
            className={category === cat ? "active" : ""}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <div className="products-grid">
        {products[category].map((p, i) => (
          <div key={i} className="product-card">
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <button onClick={() => addItem(p)}>+ Add</button>
          </div>
        ))}
      </div>
    </div>
  );
}