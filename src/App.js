import "./reset.css";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoLists from "./components/TodoLists";
import CheckAllAndRemaining from "./components/CheckAllAndRemaining";
import FilterBtns from "./components/FilterBtns";
import ClearCompleated from "./components/ClearCompleated";
import { useCallback, useEffect, useState } from "react";

function App() {
  let [todos, setTodos] = useState([]);
  const [filterTodos, setFilteredTodos] = useState(todos);
  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then((res) => res.json())
      .then((todos) => {
        setTodos(todos);
        // console.log(todos);
      });
  }, []);

  let addTodo = (todo) => {
    fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((res) => {
        todo = { ...todo, id: res.id };
        setTodos((previTodos) => [...previTodos, todo]);
      });
  };

  let deleteTodo = (id) => {
    fetch(`http://localhost:3001/todos/${id}`, {
      method: "DELETE",
    });
    setTodos((previTodos) => previTodos.filter((todo) => todo.id !== id));
  };

  let updateTodo = (updatedTodo) => {
    fetch(`http://localhost:3001/todos/${updatedTodo.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });
    setTodos((previTodos) => {
      return previTodos.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo;
        }
        return todo;
      });
    });
  };

  let checkAll = () => {
    todos.forEach((todo) => {
      todo.completed = true;
      // todo.completed ? (todo.completed = false) : (todo.completed = true);
      updateTodo(todo);
      setTodos((prev) => {
        return prev.map((t) => {
          return { ...t, completed: true };
        });
      });
    });
  };

  let remainingCount = todos.filter((t) => !t.completed).length;

  let clearCompleated = () => {
    todos.forEach((t) => {
      t.completed && deleteTodo(t.id);
    });
  };

  let filterBy = useCallback(
    (filter) => {
      if (filter === "All") {
        setFilteredTodos(todos);
      }
      if (filter === "Active") {
        setFilteredTodos(todos.filter((t) => !t.completed));
      }
      if (filter === "Completed") {
        setFilteredTodos(todos.filter((t) => t.completed));
      }
    },
    [todos]
  );
  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />
        <TodoLists
          todos={filterTodos}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
        <CheckAllAndRemaining
          checkAll={checkAll}
          remainingCount={remainingCount}
        />

        <div className="other-buttons-container">
          <FilterBtns filterBy={filterBy} />
          <ClearCompleated clearCompleated={clearCompleated} />
        </div>
      </div>
    </div>
  );
}

export default App;
