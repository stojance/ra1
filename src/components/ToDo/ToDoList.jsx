import React, { useContext, useState, useEffect } from "react";
import { TodosContext } from "./ToDo";
import {
  Col,
  Container,
  Input,
  Row,
  Table,
  Form,
  Button,
  InputGroup,
} from "reactstrap";
import MySpinner from "./../MySpinner/MySpinner";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import DataPager from "./../DataPager/index";
import * as _ from "lodash";

const SORTS = {
  none: (list) => list,
  id: (list) => _.sortBy(list, "id"),
  text: (list) => _.sortBy(list, "text"),
};

function ToDoList() {
  const { state, dispatch } = useContext(TodosContext);
  const [todoText, setTodoText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [sort, setSort] = useState({
    sortKey: "none",
    isReverse: true,
  });
  const buttonTitle = editMode ? "Save" : "Add";
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const pageSize = 8;

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

  const handleSort = (sortKey) => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse;
    const sortObj = { sortKey, isReverse };
    setSort(sortObj);
    doSortList(sortObj);
  };

  const doSortList = (sortObj) => {
    const new_list = sort.isReverse
      ? SORTS[sortObj.sortKey](state.todos).reverse()
      : SORTS[sortObj.sortKey](state.todos);
    dispatch({ type: "get", payload: new_list });
    setCurrentPage(0);
    setList(new_list.slice(0, pageSize));
  };

  const getSortButtonColor = (sortKey) => {
    if (sort.sortKey != sortKey) {
      return undefined;
    }
    return sort.isReverse ? "info" : "primary";
  };

  const getData = async () => {
    setIsLoading(true);
    const response = await axios.get(endpoint);
    dispatch({ type: "get", payload: response.data });
    setCurrentPage(0);
    setList(response.data.slice(0, pageSize));
    setIsLoading(false);
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
    if (!window.confirm("?")) return;
    await axios.delete(endpoint + todo.id);
    //dispatch({ type: "delete", payload: todo });
    await getData();
  };

  return (
    <Container className="mt-1">
      <Row>
        <Col>
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
        </Col>
      </Row>
      {!isLoading ? (
        <Row>
          <Col>
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
              <tbody>
                {list.map((todo) => (
                  <tr key={todo.id}>
                    <td>{todo.id}</td>
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
            <p>{JSON.stringify(sort)}</p>
            <p>{JSON.stringify(state.todos)}</p>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <MySpinner />
          </Col>
        </Row>
      )}
    </Container>
  );
}
export default ToDoList;
