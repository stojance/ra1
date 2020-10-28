import React, { useContext, useState, useEffect } from "react";
import { TodosContext } from "./ToDo";
import { Table, Form, Button, FormGroup, Input } from "reactstrap";
import MySpinner from "./../MySpinner/MySpinner";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import DataPager from "./../DataPager/index";
import * as _ from 'lodash';

const SORTS= {
  'none': list => list,
  'id': list => _.sortBy(list, 'id'),
  'text': list => _.sortBy(list,'text')
};

function ToDoList() {
  const { state, dispatch } = useContext(TodosContext);
  const [todoText, setTodoText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [sort, setSort] = useState({
    sortKey: 'none',
    isReverse: true
  });
  const buttonTitle = editMode ? "Save" : "Add";
  const [isLoading, setIsLoading] = useState(true);
  const [savedTodos, setSavedTodos] = useState([]);
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

  const handleSort = sortKey => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse;
    const sortObj = { sortKey, isReverse};
    setSort(sortObj);
    doSortList(sortObj);
  }

  const doSortList = sortObj => {
    const new_list = sort.isReverse ? SORTS[sortObj.sortKey](savedTodos).reverse(): SORTS[sortObj.sortKey](savedTodos);
    setSavedTodos(new_list);
    dispatch({ type: "get", payload: new_list });
    setCurrentPage(0);
    setList(new_list.slice(0, pageSize));
  } 

  const getSortButtonColor = sortKey => {
    if(sort.sortKey != sortKey){
      return undefined;
    }
    return sort.isReverse? "info": "primary";
  }

  const getData = async () => {
    setIsLoading(true);
    const response = await axios.get(endpoint);
    setSavedTodos(response.data);
    dispatch({ type: "get", payload: response.data });
    setCurrentPage(0);
    //console.log(response.data);
    setList(response.data.slice(0, pageSize));
    setIsLoading(false);

    return response.data;
  };

  const handleSubmit = async event => {
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

  const handleDelete = async todo => {
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
                <th><Button color={getSortButtonColor('id')} style={{width: '100%'}} onClick={()=>handleSort('id')}>ID</Button></th>
                <th><Button color={getSortButtonColor('text')}style={{width: '100%'}} onClick={()=>handleSort('text')}>To Do</Button></th>
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
        </div>
      ) : (
        <MySpinner />
      )}
      <p>{JSON.stringify(sort)}</p>
    </div>
  );
}
export default ToDoList;
