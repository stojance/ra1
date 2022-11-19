import React from "react";
import PropTypes from "prop-types";
import Item from "./item";
import "./cart-page.css";

export default function CartPage({ items, onAddOne, onRemoveOne }) {
  const total = items.reduce((sum, item) => {
    return sum + (item.price * item.count);
  }, 0);

  return (
    <>
      <ul className="CartPage-items">
        {items.map((item) => {
          return (
            <li key={item.id} className="CartPage-item">
              <Item item={item}>
                <div className="CartItem-controls">
                  <button
                    className="CartItem-removeOne"
                    onClick={() => onRemoveOne(item)}
                  >
                    &ndash;
                  </button>
                  <span className="CartItem-count">{item.count}</span>
                  <button
                    className="CartItem-addOne"
                    onClick={() => onAddOne(item)}
                  >
                    +
                  </button>
                </div>
              </Item>
            </li>
          );
        })}
      </ul>
      <div className="Item-right">
        <div className="Item-price" style={{fontWeight: 'bolder'}}>Total: ${total.toFixed(2)}</div>
      </div>
    </>
  );
}

CartPage.propTypes = {
  items: PropTypes.array.isRequired,
  onAddOne: PropTypes.func.isRequired,
  onRemoveOne: PropTypes.func.isRequired,
};
