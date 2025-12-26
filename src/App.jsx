import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import imgdelete from "./assets/delete.png";
import editimg from "./assets/edit.png";

function App() {

  const [todos, setTodos] = useState([]);
  const [oldtodo, setoldtodo] = useState("");
  const [editmode, seteditmode] = useState(false);
  const [newtodo, setnewtodo] = useState("");

  const BASE_URL = "https://todoserver-pojm.onrender.com";

  const todo = async () => {
    const response = await axios.get(BASE_URL);
    console.log(response.data);
    setTodos(response.data);
  };

  const add = async () => {
    if (!newtodo.trim()) return;
    await axios.post(BASE_URL, { todoitem: newtodo });
    setnewtodo("");
    todo();
  };

  const edit = async () => {
    await axios.put(BASE_URL, {
      oldtodoitem: oldtodo,
      newtodoitem: newtodo,
    });
    seteditmode(false);
    setnewtodo("");
    setoldtodo("");
    todo();
  };

  const undo = async (todoitem) => {
    await axios.delete(BASE_URL, {
      data: { todoitem }
    });
    todo();
  };

  useEffect(() => {
    todo();
  }, []);

  return (
    <div>
      <h1 className="title">To do list</h1>

      {todos.map((todo, index) => (
        <div key={index} className="todo-container">
          <h2>{todo}</h2>
          <img
            src={editimg}
            className="edit-img"
            onClick={() => {
              seteditmode(true);
              setoldtodo(todo);
              setnewtodo(todo);
            }}
          />
          <img
            src={imgdelete}
            className="delete-icon"
            onClick={() => undo(todo)}
          />
        </div>
      ))}

      <div className="container">
        <input
          type="text"
          placeholder="add task"
          className="input-task"
          value={newtodo}
          onChange={(e) => setnewtodo(e.target.value)}
        />

        <button
          className="btn-add"
          onClick={editmode ? edit : add}
        >
          {editmode ? "Update Todo" : "Add Todo"}
        </button>
      </div>
    </div>
  );
}

export default App;
