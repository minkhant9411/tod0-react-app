import React from "react";
import { useState } from "react";

export default function TodoForm({ addTodo }) {
  let [todo, SetTodo] = useState("");
  let handleSubmit = (e) => {
    e.preventDefault();
    addTodo({
      title: todo,
      completed: false,
    });
    SetTodo("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="What do you need to do?"
        onChange={(e) => SetTodo(e.target.value)}
        value={todo}
      />
    </form>
  );
}
