import React from "react";
import PropTypes from "prop-types";
import Item from "./item";
import "./items-page.css";
import DataPager from './../DataPager/data-pager';

export default function ItemsPage({ items, onAddToCart }) {

  const [list, setList] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const pageSize=4;

  React.useEffect(() => {
    setCurrentPage(0);
    setList(items.slice(0, pageSize));
    return () => {
      
    };
  }, [items]);

  const handlePageClick = (slice_items, newCurrentPage) => {
    setList(slice_items);
    setCurrentPage(newCurrentPage);
  }

  return (
    <>
    <ul className="ItemPage-items">
      {list.map((item) => {
        return (
          <li key={item.id} className="ItemPage-item">
            <Item item={item}>
                <button className="Item-addToCart" onClick={() => onAddToCart(item)}>
                    Add to cart
                </button>
            </Item>
          </li>
        );
      })}
    </ul>
    <DataPager data={items} onPageClick={handlePageClick} pageSize={pageSize} currentPage={currentPage} />
    </>
  );
}

ItemsPage.propTypes = {
  items: PropTypes.array.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};
