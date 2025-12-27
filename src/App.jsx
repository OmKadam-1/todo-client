import { useEffect, useState } from "react";
import axios from "axios";

// ✅ IMPORT IMAGES FROM ASSETS
import editIcon from "./assets/edit.png";
import deleteIcon from "./assets/delete.png";

// ✅ LIVE BACKEND URL
const API = "https://todoserver-pojm.onrender.com";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Fetch todos
  const fetchTodos = async () => {
    const res = await axios.get(`${API}/todos`);
    setTodos(res.data.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add todo
  const addTodo = async () => {
    if (!newTodo.trim()) {
      alert("Todo cannot be empty");
      return;
    }

    await axios.post(`${API}/todos`, {
      todoitem: newTodo,
    });

    setNewTodo("");
    fetchTodos();
  };

  // Delete todo
  const deleteTodo = async (todo) => {
    await axios.delete(`${API}/todos/${todo}`);
    fetchTodos();
  };

  // Start edit
  const startEdit = (todo) => {
    setEditTodo(todo);
    setEditValue(todo);
  };

  // Update todo
  const updateTodo = async () => {
    if (!editValue.trim()) {
      alert("Value cannot be empty");
      return;
    }

    await axios.put(`${API}/todos`, {
      oldtodoitem: editTodo,
      newtodoitem: editValue,
    });

    setEditTodo(null);
    setEditValue("");
    fetchTodos();
  };

  return (
    <div style={{ width: "420px", margin: "40px auto", fontFamily: "Arial" }}>
      <h2>Todo App</h2>

      {/* Add Todo */}
      <input
        placeholder="Enter todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>

      <hr />

      {/* Todo List */}
      {todos.map((todo, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
            alignItems: "center",
          }}
        >
          {editTodo === todo ? (
            <>
              <input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
              <button onClick={updateTodo}>Save</button>
            </>
          ) : (
            <>
              <span>{todo}</span>

              <span>
                {/* ✏️ EDIT ICON */}
                <img
                  src={editIcon}
                  alt="edit"
                  width="18"
                  style={{ cursor: "pointer", marginRight: "10px" }}
                  onClick={() => startEdit(todo)}
                />

                {/* 🗑️ DELETE ICON */}
                <img
                  src={deleteIcon}
                  alt="delete"
                  width="18"
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteTodo(todo)}
                />
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
