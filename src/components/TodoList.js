import React, { useState } from "react";
import "../CSS/TodoList.css";
import { MdOutlineDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { IconContext } from "react-icons";
import {
  addTodo,
  deleteTodo,
  removeAllTodos,
  checkTodo,
} from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";

function TodoList(props) {
  // const [todoData, setTodoData] = useState({
  //   todo: "",
  //   checked: false,
  // });

  const [todo, setTodo] = useState("");
  const [currentList, setCurrentList] = useState("all");

  const dispatch = useDispatch();
  const list = useSelector((state) => state.todoReducer.list);

  const filterList = () => {
    let newList = [];
    if (currentList === "pending") {
      newList = list.filter((elem) => !elem.checked);
    } else if (currentList === "finished") {
      newList = list.filter((elem) => elem.checked);
    } else {
      newList = list;
    }

    return newList;
  };

  return (
    <div className="container">
      <h1 className="title">Todo's List</h1>

      <div className="input-and-btn-container">
        <input
          type="text"
          required
          placeholder="Enter Todo Here"
          value={todo}
          onChange={(event) => setTodo(event.target.value)}
        />
        <button
          className="add-todo-btn"
          onClick={() => {
            dispatch(addTodo(todo));
            setTodo("");
          }}
        >
          Add Todo
        </button>
      </div>

      {list.length !== 0 ? (
        <div className="todo-list-container">
          <div className="navbar">
            <ul>
              <li
                className={currentList === "all" ? "active" : ""}
                onClick={() => {
                  setCurrentList("all");
                }}
              >
                All
              </li>
              <li
                className={currentList === "pending" ? "active" : ""}
                onClick={() => {
                  setCurrentList("pending");
                }}
              >
                Pending
              </li>
              <li
                className={currentList === "finished" ? "active" : ""}
                onClick={() => {
                  setCurrentList("finished");
                }}
              >
                Finished
              </li>
            </ul>
          </div>

          {filterList().map((value) => {
            return (
              <div className="todo-info-container" key={value.id}>
                <div className="todo-check">
                  <input
                    type="checkbox"
                    checked={value.checked ? value.checked : false}
                    onChange={() => {
                      dispatch(checkTodo(value.id));
                    }}
                  />
                </div>
                <div
                  className="todo"
                  style={
                    value.checked
                      ? { textDecoration: "line-through" }
                      : { textDecoration: "none" }
                  }
                >
                  {value.todo}
                </div>
                <div
                  className="delete-btn-container"
                  onClick={() => dispatch(deleteTodo(value.id))}
                >
                  <IconContext.Provider value={{ className: "delete-btn" }}>
                    <MdOutlineDelete />
                  </IconContext.Provider>
                </div>
                {/* <div className="edit-btn-container">
                <IconContext.Provider value={{ className: "edit-btn" }}>
                <FiEdit />
                </IconContext.Provider>
              </div> */}
              </div>
            );
          })}
        </div>
      ) : null}

      <button
        className="remove-all-btn"
        onClick={() => dispatch(removeAllTodos())}
      >
        Clear All
      </button>
    </div>
  );
}

export default TodoList;
