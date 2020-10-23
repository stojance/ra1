import React from "react";
import "./shopping-cart.css";

export default function Nav({ activeTab, onTabChange, cart }) {
  const itemClass = (tabName) =>
    `App-nav-item ${tabName === activeTab ? "selected" : ""}`;

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.count;
  }, 0);
  const count = cart.reduce((sum, item) => {
    return sum + item.count;
  }, 0);

  return (
    <nav className="App-nav">
      <ul>
        <li className={itemClass("items")}>
          <button onClick={() => onTabChange("items")}>Items</button>
        </li>
        <li className={itemClass("cart")}>
          <button onClick={() => onTabChange("cart")}>Cart</button>
        </li>
        <li className="App-nav-item" style={{float: 'right', margin:0}}>
          <div className="Item-right">
            <div className="Item-price" style={{ fontWeight: "bolder" }}>
              {count} Items (${total.toFixed(2)})
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
}
