import React, { useCallback, useState } from "react";
import TodoList from "./TodoList";
import TodoIsCompleted from "./TodoIsCompleted";
//rfc
import TextField from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { v4 } from "uuid";

import Todo from "./Todo";
export default function TodoListSearch() {
  const [todoList, setTodoList] = useState([]);
  const [textInputSeach, setTextInputSearch] = useState("");
  const [showTodoList, setShowTodoList] = useState(false);
  const [countCompleted, setCountCompleted] = useState(0);

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

  const onShowTodoList = () => {
    setShowTodoList(true);
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
    setTodoList((prevTodoList) => prevTodoList.filter(e => e.id !== index));
  }, []);

  const onHideTodoList = useCallback((e) => {
    setShowTodoList(e);
  }, []);

  return (
    <>
      <div className="gravity h-[100vh] relative">
        <div className="w-[768px] p-3">
          <div className="title gravity p-2">Smatyx Todos App</div>
          <div className="gravity gap-2">
            <TextField
              className="text_field"
              name="todo-search"
              placeholder="Search Todos"
              elemAfterInput={
                <Button
                  isDisabled={false}
                  appearance="primary"
                  onClick={onClickBtnSearch}
                >
                  Search
                </Button>
              }
              onChange={onTextInputSearchChange}
            />
            <Button
              isDisabled={false}
              appearance="primary"
              onClick={onShowTodoList}
            >
              Add Todos
            </Button>
            {showTodoList ? (
              <TodoList onHideTodoList={onHideTodoList} onAddTodo={onAddTodo} />
            ) : null}
          </div>
          <Todo
            ArrayTodoList={todoList}
            textInputSeach={textInputSeach}
            handleCheckClick={handleCheckClick}
            handleRemoveClick={handleRemoveClick}
          />
          <Button className="mt-3 button">
            Completed Todos {countCompleted}
          </Button>
          <TodoIsCompleted
            ArrayTodoList={todoList}
            textInputSeach={textInputSeach}
            onCountCompleted={onCountCompleted}
            handleRemoveClick={handleRemoveClick}
            handleUnCheckClick={handleUnCheckClick}
          ></TodoIsCompleted>
        </div>
      </div>
    </>
  );
}
