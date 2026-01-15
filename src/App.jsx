import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import imgDelete from "./assets/delete.png";
import imgEdit from "./assets/edit.png";

function App() {
  const [todos, setTodos] = useState([]);
  const [oldTodo, setOldTodo] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [newTodo, setNewTodo] = useState("");

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8008";


  const loadTodos = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/todos`);
      setTodos(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error(error);
      setTodos([]);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    await axios.post(`${BASE_URL}/todos`, {
      todoItem: newTodo, // ✅ backend expects this
    });

    setNewTodo("");
    loadTodos();
  };

  const editTodo = async () => {
    if (!newTodo.trim()) return;

    await axios.put(`${BASE_URL}/todos`, {
      oldTodoItem: oldTodo, // ✅ backend expects this
      newTodoItem: newTodo, // ✅ backend expects this
    });

    setEditMode(false);
    setNewTodo("");
    setOldTodo("");
    loadTodos();
  };

  const deleteTodo = async (todoItem) => {
    await axios.delete(`${BASE_URL}/todos`, {
      data: { todoItem }, // ✅ backend expects body
    });

    loadTodos();
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <p>{editMode ? "Edit Todo" : "Add Todo"}</p>

      <div className="todo-items-container">
        {todos?.map((todo, index) => (
          <div key={index} className="todo-card">
            <p>{todo}</p>
            <div>
              <img
                src={imgEdit}
                className="img-edit-todo"
                onClick={() => {
                  setEditMode(true);
                  setOldTodo(todo);
                  setNewTodo(todo);
                }}
              />
              <img
                src={imgDelete}
                className="img-delete-todo"
                onClick={() => deleteTodo(todo)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="todo-add-container">
        <input
          type="text"
          placeholder="New Todo"
          className="input-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />

        <button
          className="btn-add-todo"
          onClick={() => {
            editMode ? editTodo() : addTodo();
          }}
        >
          {editMode ? "Edit Todo" : "Add Todo"}
        </button>
      </div>
    </div>
  );
}

export default App;
