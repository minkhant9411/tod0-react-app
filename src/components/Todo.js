import React, { useState } from "react";

export default function Todo({ todo, deleteTodo, updateTodo }) {
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(todo.title);
  let updateHandler = (e) => {
    e.preventDefault();
    todo.title !== title &&
      updateTodo({
        id: todo.id,
        title: title,
        completed: false,
      });
    setIsEdit(false);
  };

  let checkboxHandler = () => {
    updateTodo({
      id: todo.id,
      title: todo.title,
      completed: !todo.completed,
    });
  };
  return (
    <li className="todo-item-container">
      <div className="todo-item" onDoubleClick={() => setIsEdit(true)}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={checkboxHandler}
        />
        {!isEdit && (
          <span
            className={`todo-item-label ${todo.completed && "line-through"}`}
          >
            {todo.title}
          </span>
        )}
        {isEdit && (
          <form onSubmit={updateHandler}>
            <input
              autoFocus
              type="text"
              className="todo-item-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </form>
        )}
      </div>
      <button className="x-button" onClick={() => deleteTodo(todo.id)}>
        <svg
          className="x-button-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </li>
  );
}
