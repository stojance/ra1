import React from "react";

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return [
        ...state,
        {
          id: state.lenght,
          name: action.data,
        },
      ];
    case "remove":
      return state.filter((_, index) => index !== action.index);
    case "clear":
      return [];
    default:
      return state;
  }
}

export default function TestList(props) {
  const [items, dispach] = React.useReducer(reducer, []);
  const inputRef = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispach({
      type: "add",
      data: inputRef.current.value,
    });
    inputRef.current.value = "";
  };
  const handleRemove = (index) => {
    dispach({
      type: "remove",
      index,
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} />
      </form>
      <button onClick={() => dispach({ type: "clear" })}>CLEAR !</button>
      <ul>
        {items.map((item, index) => {
          return (
            <li key={item.id}>
              {item.name}
              <button onClick={() => handleRemove(index)}>X</button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
