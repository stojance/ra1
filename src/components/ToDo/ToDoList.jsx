import React, { useContext, useState, useEffect } from "react";
import { TodosContext } from "./ToDo";
import { Table, Form, Button, FormGroup, Input } from "reactstrap";
import useAPI from "./useAPI";
import MySpinner from "./../MySpinner/MySpinner";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import DataPager from "./../DataPager/index";

function ToDoList() {
  const { state, dispatch } = useContext(TodosContext);
  const [todoText, setTodoText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const buttonTitle = editMode ? "Save" : "Add";
  const [isLoading, setIsLoading] = useState(true);
  const [savedTodos, setSavedTodos] = useState([]);
  const [list, setList] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const pageSize = 4;

  const endpoint = "http://localhost:3000/todos/";
  //let savedTodos = useAPI(endpoint);

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []); 

  const handlePageClick = (slice_items, newCurrentPage) => {
    setList(slice_items);
    setCurrentPage(newCurrentPage);
  };

  const getData = async () => {
    setIsLoading(true);
    const response = await axios.get(endpoint);
    setSavedTodos(response.data);
    dispatch({ type: "get", payload: response.data });
    setCurrentPage(0);
    console.log(response.data);
    setList(response.data.slice(0, pageSize));
    setIsLoading(false);

    return response.data;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (editMode) {
      await axios.patch(endpoint + editTodo.id, { text: todoText });
      //dispatch({ type: "edit", payload: { ...editTodo, text: todoText } });
      setEditMode(false);
      setEditTodo(null);
    } else {
      if (todoText) {
        const newToDo = { id: uuidv4(), text: todoText };
        const response = await axios.post(endpoint, newToDo);
        //dispatch({ type: "add", payload: newToDo });
      }
    }
    await getData();
    setIsLoading(false);
    setTodoText("");
  };

  const handleDelete = async (todo) => {
    if(!window.confirm("?")) return;
    await axios.delete(endpoint + todo.id);
    //dispatch({ type: "delete", payload: todo });
    await getData();
  };

  return (
    <div className="mt-1">
      <Form onSubmit={handleSubmit} inline className="pt-2">
        <FormGroup>
          <Input
            type="text"
            placeholder="Enter To Do"
            onChange={(event) => setTodoText(event.target.value)}
            value={todoText}
            style={{ width: "400px" }}
          />
        </FormGroup>
        <FormGroup>
          <Button color="primary" type="submit">
            {buttonTitle}
          </Button>
        </FormGroup>
        {editMode && (
          <FormGroup>
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
          </FormGroup>
        )}
      </Form>
      {!isLoading ? (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>To Do</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {list.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.text}</td>
                  <td
                    onClick={() => {
                      setTodoText(todo.text);
                      setEditMode(true);
                      setEditTodo(todo);
                    }}
                  >
                    <strong style={{ cursor: "pointer", color: "blue" }}>
                      Edit
                    </strong>
                  </td>
                  <td onClick={() => handleDelete(todo)}>
                    <strong style={{ cursor: "pointer", color: "red" }}>
                      Delete
                    </strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <DataPager
            data={state.todos}
            onPageClick={handlePageClick}
            pageSize={pageSize}
            currentPage={currentPage}
          />
        </div>
      ) : (
        <MySpinner />
      )}
    </div>
  );
}
export default ToDoList;
