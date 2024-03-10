import React from "react";
import Button from "@atlaskit/button";
import TrashIcon from "@atlaskit/icon/glyph/trash";
import CheckCircleOutlineIcon from "@atlaskit/icon/glyph/check-circle-outline";

export default function Todo({
  ArrayTodoList,
  textInputSeach,
  handleCheckClick,
  handleRemoveClick,
}) {
  const arrayTodoListCompleted = ArrayTodoList.filter(
    (item) => !item.isCompleted
  );
  const arrayTodoListFilter =
    textInputSeach != ""
      ? arrayTodoListCompleted.filter((item) => textInputSeach === item.name)
      : arrayTodoListCompleted;

  return (
    <>
      {arrayTodoListFilter.map((item) => {
        return (
          <Button shouldFitContainer className="todo_item" key={item.id}>
            <span>{item.name}</span>
            <div className="gravity gap-2">
              <span className="gravity container_icon btnRemove" onClick={()=>handleRemoveClick(item.id)}>
                <TrashIcon />
              </span>
              <span
                className="gravity container_icon btnCheck"
                onClick={() => handleCheckClick(item.id)}
              >
                <CheckCircleOutlineIcon />
              </span>
            </div>
          </Button>
        );
      })}
    </>
  );
}
