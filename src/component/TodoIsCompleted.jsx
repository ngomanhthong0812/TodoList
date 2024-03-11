import React, { useEffect } from "react";
import Button from "@atlaskit/button";

import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegPenToSquare, FaCheckToSlot } from "react-icons/fa6";

export default function TodoIsCompleted({
  arrayTodoList,
  textInputSeach,
  onCountCompleted,
  handleRemoveClick,
  handleUnCheckClick,
  onShowSetTodoList,
}) {
  const arrayTodoListCompleted = arrayTodoList.filter(
    (item) => item.isCompleted
  );
  const arrayTodoListFilter =
    textInputSeach != ""
      ? arrayTodoListCompleted.filter((item) => textInputSeach === item.name)
      : arrayTodoListCompleted;

  useEffect(() => {
    onCountCompleted(arrayTodoListCompleted.length);
  }, [arrayTodoListCompleted.length]);
  return (
    <>
      {arrayTodoListFilter.map((item) => {
        return (
          <Button shouldFitContainer className="todo_item" key={item.id}>
            <span>{item.name}</span>
            <div className="gravity gap-2">
              <span
                className="gravity container_icon btnRemove"
                onClick={() => handleRemoveClick(item.id)}
              >
                <FaRegTrashAlt />
              </span>
              <span
                className="gravity container_icon btnSetTodo"
                onClick={() => onShowSetTodoList(true,item.id)}
              >
                <FaRegPenToSquare />
              </span>
              <span
                className="gravity container_icon btnCheckCompleted"
                onClick={() => handleUnCheckClick(item.id)}
              >
                <FaCheckToSlot />
              </span>
            </div>
          </Button>
        );
      })}
    </>
  );
}
