import { useEffect, useState } from "react";
import axios from "axios";


import editIcon from "./assets/edit.png";
import deleteIcon from "./assets/delete.png";


const API = process.env.REACT_APP_API || "https://todoserver-pojm.onrender.com";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState(null);
  const [editValue, setEditValue] = useState("");

  
  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API}/todos`);
      setTodos(res.data.data);
    } catch (err) {
      console.error("Failed to fetch todos:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  
  const addTodo = async () => {
    if (!newTodo.trim()) return alert("Todo cannot be empty");

    try {
      await axios.post(`${API}/todos`, { todoitem: newTodo });
      setNewTodo("");
      fetchTodos();
    } catch (err) {
      console.error("Add todo failed:", err);
    }
  };

  
  const deleteTodo = async (todo) => {
    try {
      
      await axios.delete(`${API}/todos/${encodeURIComponent(todo)}`);
      fetchTodos();
    } catch (err) {
      console.error("Delete todo failed:", err);
      alert("Failed to delete todo");
    }
  };

 
  const startEdit = (todo) => {
    setEditTodo(todo);
    setEditValue(todo);
  };

  
  const updateTodo = async () => {
    if (!editValue.trim()) return alert("Value cannot be empty");

    try {
      await axios.put(`${API}/todos`, {
        oldtodoitem: editTodo,
        newtodoitem: editValue,
      });
      setEditTodo(null);
      setEditValue("");
      fetchTodos();
    } catch (err) {
      console.error("Update todo failed:", err);
    }
  };

  return (
    <div style={{ width: "420px", margin: "40px auto", fontFamily: "Arial" }}>
      <h2>Todo App</h2>

      
      <input
        placeholder="Enter todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>

      <hr />

     
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
              
                <img
                  src={editIcon}
                  alt="edit"
                  width="18"
                  style={{ cursor: "pointer", marginRight: "10px" }}
                  onClick={() => startEdit(todo)}
                />

               
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