import React, { useState, useEffect } from "react";
import { Table, Form, Button, FormGroup, Input, InputGroup } from "reactstrap";
import MySpinner from "./../MySpinner/MySpinner";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import ReactList from "react-list";
import * as _ from "lodash";
import { confirm } from "react-confirm-box";

const SORTS = {
  none: (list) => list,
  id: (list) => _.sortBy(list, "id"),
  text: (list) => _.sortBy(list, "text"),
};

function ToDoListVirt() {
  const [todoText, setTodoText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [sort, setSort] = useState({
    sortKey: "none",
    isReverse: true,
  });
  const buttonTitle = editMode ? "Save" : "Add";
  const [isLoading, setIsLoading] = useState(true);
  const [savedTodos, setSavedTodos] = useState([]);
  const [list, setList] = React.useState([]);

  const endpoint = "http://localhost:3000/todos/";

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    const response = await axios.get(endpoint);
    setSavedTodos(response.data);
    setList(response.data);
    setIsLoading(false);

    return response.data;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (editMode) {
      const response = await axios.patch(endpoint + editTodo.id, {
        text: todoText,
      });
      console.log(response);
      setEditMode(false);
      setEditTodo(null);
    } else {
      if (todoText) {
        const newToDo = { id: uuidv4(), text: todoText };
        const response = await axios.post(endpoint, newToDo);
        console.log(response);
      }
    }
    await getData();
    setIsLoading(false);
    setTodoText("");
  };

  const handleSort = (sortKey) => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse;
    const sortObj = { sortKey, isReverse };
    setSort(sortObj);
    doSortList(sortObj);
  };

  const doSortList = (sortObj) => {
    const new_list = sort.isReverse
      ? SORTS[sortObj.sortKey](savedTodos).reverse()
      : SORTS[sortObj.sortKey](savedTodos);
    setSavedTodos(new_list);
    setList(new_list);
  };

  const getSortButtonColor = (sortKey) => {
    if (sort.sortKey != sortKey) {
      return undefined;
    }
    return sort.isReverse ? "info" : "primary";
  };

  const handleDelete = async (todo) => {
    //if (!window.confirm("?")) return;
    const options = {
      labels: {
        confirmable: "Да",
        cancellable: "Не",
      },
    };
    const result = await confirm("Сигурно ?", options);
    if (result) {
      await axios.delete(endpoint + todo.id);
      await getData();
    }
  };

  const renderRow = (index, key) => {
    const todo = list[index];
    return (
      <tr key={key}>
        <td>{todo.id}</td>
        <td>{todo.text}</td>
        <td
          onClick={() => {
            setTodoText(todo.text);
            setEditMode(true);
            setEditTodo(todo);
          }}
        >
          <strong style={{ cursor: "pointer", color: "blue" }}>Edit</strong>
        </td>
        <td onClick={() => handleDelete(todo)}>
          <strong style={{ cursor: "pointer", color: "red" }}>Delete</strong>
        </td>
      </tr>
    );
  };

  const renderTable = (items, ref) => {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <Button
                color={getSortButtonColor("id")}
                style={{ width: "100%" }}
                onClick={() => handleSort("id")}
              >
                ID
              </Button>
            </th>
            <th>
              <Button
                color={getSortButtonColor("text")}
                style={{ width: "100%" }}
                onClick={() => handleSort("text")}
              >
                To Do
              </Button>
            </th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody ref={ref}>{items}</tbody>
      </Table>
    );
  };

  return (
    <div className="mt-1">
      <Form onSubmit={handleSubmit} inline="true" className="pt-2">
        <InputGroup>
          <Input
            type="text"
            required
            placeholder="Enter To Do"
            onChange={(event) => setTodoText(event.target.value)}
            value={todoText}
            style={{ width: "400px" }}
          />
          <Button color="primary" type="submit">
            {buttonTitle}
          </Button>
          {editMode && (
            <Button
              color="info"
              onClick={() => {
                setEditMode(false);
                setTodoText("");
                setEditTodo(null);
              }}
            >
              New
            </Button>
          )}
        </InputGroup>
      </Form>
      {!isLoading ? (
        <div style={{ height: "600px", overflow: "auto" }}>
          <ReactList
            itemsRenderer={renderTable}
            itemRenderer={renderRow}
            length={list.length}
            type="uniform"
          />
        </div>
      ) : (
        <MySpinner />
      )}
      <p>{JSON.stringify(sort)}</p>
    </div>
  );
}
export default ToDoListVirt;
