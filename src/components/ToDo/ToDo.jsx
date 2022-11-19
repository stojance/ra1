import React, { useReducer } from "react";
import ToDoList from "./ToDoList";
import ToDoListWithApi from "./ToDoListWithApi";

const todosInitialState = {
  todos: [],
};

function todosReducer(state, action) {
  switch (action.type) {
    case "get":
      return { ...state, todos: action.payload };
    case "add":
      const addedToDos = [...state.todos, action.payload];
      return { ...state, todos: addedToDos };
    case "delete":
      if (window.confirm("?") === false) return state;
      const filteredTodoState = state.todos.filter(
        (todo) => todo.id !== action.payload.id
      );
      return { ...state, todos: filteredTodoState };
    case "edit":
      const updatedToDo = { ...action.payload };
      const updatedToDoIndex = state.todos.findIndex(
        (t) => t.id === action.payload.id
      );
      const updatedToDos = [
        ...state.todos.slice(0, updatedToDoIndex),
        updatedToDo,
        ...state.todos.slice(updatedToDoIndex + 1),
      ];
      return { ...state, todos: updatedToDos };
    default:
      return todosInitialState;
  }
}

export const TodosContext = React.createContext();

export default function ToDo() {
  const [state, dispatch] = useReducer(todosReducer, todosInitialState);
  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <ToDoListWithApi />
    </TodosContext.Provider>
  );
}
