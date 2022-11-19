import React from "react";
import Nav from "./nav";
import "./shopping-cart.css";

import { items } from "./static-data";
import ItemsPage from "./items-page";
import CartPage from "./cart-page";

const sumarizeCart = (cart) => {
  const groupedItems = cart.reduce((summary, item) => {
    summary[item.id] = summary[item.id] || {
      ...item,
      count: 0,
    };
    summary[item.id].count++;

    return summary;
  }, {});
  console.log(groupedItems);

  return Object.values(groupedItems);
};

export default function ShoppingCart(props) {
  const [activeTab, setActiveTab] = React.useState("items");
  const [cart, setCart] = React.useState([]);

  const addToCart = (item) => setCart((prevCart) => [...prevCart, item]);
  const removeItem = (item) => {
    let index = cart.findIndex((i) => i.id === item.id);
    if (index >= 0) {
      setCart((cart) => {
        const copy = [...cart];
        copy.splice(index, 1);
        return copy;
      });
    }
  };
  return (
    <div className="App">
      <Nav activeTab={activeTab} onTabChange={setActiveTab} cart={sumarizeCart(cart)} />
      <main className="App-content">
        <Content
          tab={activeTab}
          onAddToCart={addToCart}
          onRemoveItem={removeItem}
          cart={sumarizeCart(cart)}
        />
      </main>
    </div>
  );
}

const Content = ({ tab, onAddToCart, onRemoveItem, cart }) => {
  switch (tab) {
    default:
    case "items":
      return <ItemsPage items={items} onAddToCart={onAddToCart} />;
    case "cart":
      return (
        <CartPage
          items={cart}
          onAddOne={onAddToCart}
          onRemoveOne={onRemoveItem}
        />
      );
  }
};
