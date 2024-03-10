import React, { useCallback, useState } from "react";
import TextField from "@atlaskit/textfield";
import Button from "@atlaskit/button";

export default function TodoList({ onHideTodoList, onAddTodo }) {
  const [textInput, setTextInput] = useState("");

  const onAddBtnClick = useCallback(() => {
    onAddTodo(textInput);
    onHideTodoList(false);
  }, [textInput]);

  const onChangeTextInput = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const handeCancellClick = () => {
    onHideTodoList(false);
  };
  return (
    <main className="w-[100%] h-[100%] bg-gray-900 bg-opacity-40 gravity absolute top-0 left-0 z-10">
      <div className="bg-white px-7 pt-7 rounded-[10px] w-[440px]">
        <TextField
          name="todo-app"
          placeholder="Add Todos"
          onChange={onChangeTextInput}
        ></TextField>
        <div className="gravity gap-6 border-t-[1px] mt-5 py-7">
          <Button className="button" onClick={onAddBtnClick}>
            Save
          </Button>
          <Button className="button-1" onClick={handeCancellClick}>
            Cancel
          </Button>
        </div>
      </div>
    </main>
  );
}
