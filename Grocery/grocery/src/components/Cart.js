import { useContext, useState } from "react";
import { BudgetContext } from "../context/BudgetContext";

export default function Cart() {
  const {
    items,
    setItems,
    totalSpent,
    setCategoryBudgets,
    setIsBudgetSet,
  } = useContext(BudgetContext);

  const [paymentMethod, setPaymentMethod] = useState("");

  const handleDelete = (id) => {
  fetch(`http://localhost:8080/api/items/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      setItems(items.filter((item) => item.id !== id));
    })
    .catch(() => alert("❌ Delete failed"));
};

  const handlePayment = () => {
    if (items.length === 0) {
      alert("🛒 Cart is empty!");
      return;
    }

    if (!paymentMethod) {
      alert("⚠️ Select payment method");
      return;
    }

    alert(
      `✅ Payment Successful!\nMethod: ${paymentMethod}\nAmount: ₹${totalSpent}`
    );

    // 🧼 RESET EVERYTHING
    setItems([]);

    setCategoryBudgets({
      Fruits: 0,
      Vegetables: 0,
      Dairy: 0,
      Snacks: 0,
    });

    setIsBudgetSet(false);
    setPaymentMethod("");

    localStorage.removeItem("items");
    localStorage.removeItem("budgets");
  };

  return (
    <div>
      <h2>🧾 Your Cart</h2>

      {items.length === 0 ? (
        <p>No items added</p>
      ) : (
        items.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              background: "#334155",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <span>
              {item.name} x{item.quantity || 1}
            </span>

            <div>
              ₹{item.price}
              <button
                onClick={() => handleDelete(item.id)}
                style={{
                  marginLeft: "10px",
                  background: "#ef4444",
                  border: "none",
                  borderRadius: "6px",
                  padding: "4px 8px",
                  color: "white",
                }}
              >
                🗑️
              </button>
            </div>
          </div>
        ))
      )}

      <h3>Total: ₹{totalSpent}</h3>

      <h3>💳 Payment Method</h3>

      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "8px",
        }}
      >
        <option value="">Select Payment</option>
        <option value="UPI">UPI 📱</option>
        <option value="Card">Card 💳</option>
        <option value="NetBanking">Net Banking 🏦</option>
        <option value="COD">Cash on Delivery 💵</option>
      </select>

      <button
  onClick={handlePayment}
  disabled={!paymentMethod}
  style={{
    width: "100%",
    padding: "14px",
    background: paymentMethod ? "#22c55e" : "#64748b",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    marginTop: "10px",
    cursor: paymentMethod ? "pointer" : "not-allowed"
  }}
>
  💳 Pay ₹{totalSpent}
</button>
    </div>
  );
}