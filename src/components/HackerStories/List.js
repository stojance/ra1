import React from "react";
import _ from "lodash";
import { ReactComponent as Cross } from "../../svg/cross.svg";

const SORTS = {
  NONE: (list) => list,
  TITLE: (list) => _.sortBy(list, "title"),
  AUTHOR: (list) => _.sortBy(list, "author"),
  CREATED_AT: (list) => _.sortBy(list, "created_at"),
  COMMENT: (list) => _.sortBy(list, "num_comments"),
  POINTS: (list) => _.sortBy(list, "points"),
};

const List = ({ list, onRemoveItem }) => {
  const [sort, setSort] = React.useState({
    sortKey: "NONE",
    isReverse: false,
  });

  if (!list) return <p>нема податоци...</p>;

  const handleSort = (sortKey) => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse;
    setSort({ sortKey, isReverse });
  };

  const getAscDescClass = (sortKey) => {
    if (sort.sortKey !== sortKey) return "button button button-asc";
    const isReverse = sort.sortKey === sortKey && !sort.isReverse;
    const isSelected = sort.sortKey === sortKey;

    let cls = isReverse ? "button button-asc" : "button button-desc";

    if (isSelected) cls += " button-selected";

    return cls;
  };

  const sortFunc = SORTS[sort.sortKey];
  const sortedList = sort.isReverse ? sortFunc(list).reverse() : sortFunc(list);

  return (
    <ul>
      <li className="item">
        <span style={{ width: "30%" }}>
          <button
            className={`${getAscDescClass("TITLE")}`}
            onClick={() => handleSort("TITLE")}
          >
            Title
          </button>
        </span>
        <span style={{ width: "20%" }}>
          <button
            className={`${getAscDescClass("AUTHOR")}`}
            onClick={() => handleSort("AUTHOR")}
          >
            Author
          </button>
        </span>
        <span style={{ width: "10%" }}>
          <button
            className={`${getAscDescClass("CREATED_AT")}`}
            onClick={() => handleSort("CREATED_AT")}
          >
            Createrd At
          </button>
        </span>
        <span style={{ width: "10%" }}>
          <button
            className={`${getAscDescClass("COMMENT")}`}
            onClick={() => handleSort("COMMENT")}
          >
            Comments
          </button>
        </span>
        <span style={{ width: "10%" }}>
          <button
            className={`${getAscDescClass("POINTS")}`}
            onClick={() => handleSort("POINTS")}
          >
            Points
          </button>
        </span>
        <span style={{ width: "10%" }}>Actions</span>
      </li>
      {sortedList.map((item) => (
        <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
      ))}
    </ul>
  );
};

const Item = ({ item, onRemoveItem }) => (
  <li className="item">
    <span style={{ width: "30%" }}>
      <a href={item.url} target="_blank" rel="noreferrer">
        {item.title}
      </a>
    </span>
    &nbsp;
    <span style={{ width: "20%" }}>{item.author}</span>
    &nbsp;
    <span style={{ width: "10%" }}>{item.created_at}</span>
    &nbsp;
    <span style={{ width: "10%" }}>{item.num_comments}</span>
    &nbsp;
    <span style={{ width: "10%" }}>{item.points}</span>
    &nbsp;
    <span>
      <button
        className="button button_small"
        onClick={() => onRemoveItem(item)}
      >
        <Cross />
      </button>
    </span>
  </li>
);

export { List };
