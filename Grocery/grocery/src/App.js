import "./App.css";
import BudgetInput from "./components/BudgetInput";
import ItemForm from "./components/ItemForm";
import Tracker from "./components/Tracker";
import Cart from "./components/Cart";
import { useContext } from "react";
import { BudgetContext } from "./context/BudgetContext";

function App() {
  const { isBudgetSet } = useContext(BudgetContext);

  return (
    <div className="app">
      <h1 className="title">🛒 Grocery Budget Tracker</h1>

      {/* TOP SECTION */}
      <div className="top-section">
        <div className="card"><BudgetInput /></div>
        <div className="card"><Tracker /></div>
      </div>

      {/* SHOP SECTION */}
      {isBudgetSet && (
        <div className="card shop-section">
          <ItemForm />
        </div>
      )}

      {/* CART SECTION */}
      <div className="card cart-section">
        <Cart />
      </div>
    </div>
  );
}

export default App;