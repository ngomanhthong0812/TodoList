import React, { useCallback, useEffect, useState } from "react";
import TextField from "@atlaskit/textfield";
import Button from "@atlaskit/button";

export default function SetTodoList({
  onShowSetTodoList,
  onSetTodo,
  arrayTodoList,
  idSetTodo,
}) {
  const [textInput, setTextInput] = useState("");
  const [textError, setTextError] = useState("");

  const updateTextInputById = useCallback(() => {
    const selectedItem = arrayTodoList.find((item) => item.id === idSetTodo);
    if (selectedItem) {
      setTextInput(selectedItem.name);
    }
  }, [arrayTodoList, idSetTodo]);

  useEffect(() => {
    updateTextInputById();
  }, [updateTextInputById]);

  const updateTodo = useCallback(() => {
    if (textInput !== "") {
      onSetTodo(textInput);
      onShowSetTodoList(false);
    } else {
      setTextError("Không được để trống :>");
    }
  }, [textInput]);

  const onChangeTextInput = useCallback((e) => {
    setTextError("");
    setTextInput(e.target.value);
  }, []);

  return (
    <main className="w-[100%] h-[100%] bg-gray-900 bg-opacity-40 gravity absolute top-0 left-0 z-10">
      <div className="bg-white px-7 pt-7 rounded-[10px] w-[440px]">
        <TextField
          className="text_field"
          name="todo-app"
          placeholder="Add Todos"
          onChange={onChangeTextInput}
          value={textInput}
        ></TextField>
        <div className="text-red-500 text-[12px]">{textError}</div>
        <div className="gravity gap-6 border-t-[1px] mt-5 py-7">
          <Button className="btn-completed" onClick={updateTodo}>
            Save
          </Button>
          <Button className="button-1" onClick={() => onShowSetTodoList(false)}>
            Cancel
          </Button>
        </div>
      </div>
    </main>
  );
}
