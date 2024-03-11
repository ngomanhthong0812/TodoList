import React, { useCallback, useState } from "react";
import TodoList from "./TodoList";
import SetTodoList from "./SetTodoList";
import TodoIsCompleted from "./TodoIsCompleted";
//rfc
import TextField from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { v4 } from "uuid";

import { IoSearch } from "react-icons/io5";

import Todo from "./Todo";
export default function TodoListSearch() {
  const [todoList, setTodoList] = useState([]);
  const [textInputSeach, setTextInputSearch] = useState("");
  const [showTodoList, setShowTodoList] = useState(false);
  const [showSetTodoList, setShowSetTodoList] = useState(false);
  const [countCompleted, setCountCompleted] = useState(0);
  const [idSetInput, setIdSetInput] = useState(null);

  const onTextInputSearchChange = useCallback((e) => {
    setTextInputSearch(e.target.value);
  }, []);
  const onClickBtnSearch = () => {};

  const onAddTodo = useCallback(
    (e) => {
      setTodoList([...todoList, { id: v4(), name: e, isCompleted: false }]);
    },
    [todoList]
  );

  const onSetTodo = useCallback((e) => {
    setTodoList((prevTodoList) =>
      prevTodoList.map((item) =>
        item.id === idSetInput ? { ...item, name: e } : item
      )
    );
  });

  const onShowTodoList = () => {
    setShowTodoList(true);
  };
  /// ne
  const onShowSetTodoList = (e, id) => {
    setShowSetTodoList(e);
    setIdSetInput(id);
  };
  const handleCheckClick = (idItems) => {
    setTodoList((prevTodoList) =>
      prevTodoList.map((element) =>
        element.id === idItems ? { ...element, isCompleted: true } : element
      )
    );
  };
  const handleUnCheckClick = (idItems) => {
    setTodoList((prevTodoList) =>
      prevTodoList.map((element) =>
        element.id === idItems ? { ...element, isCompleted: false } : element
      )
    );
  };
  const onCountCompleted = useCallback((index) => {
    setCountCompleted(index);
  }, []);
  const handleRemoveClick = useCallback((index) => {
    setTodoList((prevTodoList) => prevTodoList.filter((e) => e.id !== index));
  }, []);

  const onHideTodoList = useCallback((e) => {
    setShowTodoList(e);
  }, []);

  return (
    <>
      <div className="gravity h-[100vh] relative">
        <div className="w-[768px] p-3">
          <div className="title gravity">
            <span className="title-color">Smatyx</span> <span>Todos App</span>
          </div>
          <div className="gravity gap-2">
            <TextField
              className="text_field"
              name="todo-search"
              placeholder="Search Todos"
              elemAfterInput={
                <span
                  onClick={onClickBtnSearch}
                  className="gravity container_icon btnSearch"
                >
                  <IoSearch />
                </span>
              }
              onChange={onTextInputSearchChange}
            />
            <Button
              isDisabled={false}
              appearance="primary"
              onClick={onShowTodoList}
              className="container_icon btnAddTodo"
            >
              Add Todos
            </Button>
            {showTodoList ? (
              <TodoList onHideTodoList={onHideTodoList} onAddTodo={onAddTodo} />
            ) : null}
            {showSetTodoList ? (
              <SetTodoList
                onShowSetTodoList={onShowSetTodoList}
                arrayTodoList={todoList}
                idSetTodo={idSetInput}
                onSetTodo={onSetTodo}
              />
            ) : null}
          </div>
          <Todo
            arrayTodoList={todoList}
            textInputSeach={textInputSeach}
            handleCheckClick={handleCheckClick}
            handleRemoveClick={handleRemoveClick}
            onShowSetTodoList={onShowSetTodoList}
          />
          <Button className="mt-3 btn-completed">
            Completed Todos {countCompleted}
          </Button>
          <TodoIsCompleted
            arrayTodoList={todoList}
            textInputSeach={textInputSeach}
            onCountCompleted={onCountCompleted}
            handleRemoveClick={handleRemoveClick}
            handleUnCheckClick={handleUnCheckClick}
            onShowSetTodoList={onShowSetTodoList}
          ></TodoIsCompleted>
        </div>
      </div>
    </>
  );
}
