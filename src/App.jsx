import { useEffect, useState } from "react";
import "./App.css";
import axios, { Axios } from "axios";
import imgdelete from "./assets/delete.png";
import editimg from "./assets/edit.png";




function App() {

    const [todos, setTodos] = useState([]);
    const [oldtodo, setoldtodo] = useState("");
    const [editmode, seteditmode] = useState("false");
    const [newtodo, setnewtodo] = useState("");


    const todo = async () => {
        console.log("Loading");
        const response = await axios.get("https://todoserver-pojm.onrender.com");


        setTodos(response.data.data);
    };
    const add = async () => {
        const response = await axios.post("https://todoserver-pojm.onrender.com", { todoitem: newtodo },);
        setnewtodo("");
        todo();
    }
    const edit = async() =>{
        const response = await axios.put("https://todoserver-pojm.onrender.com",{
            "oldtodoitem":oldtodo,
            "newtodoitem":newtodo,
        });
        todo();
        seteditmode(false);
        setnewtodo("");
        setoldtodo("");
    }
    const undo = async (todoitem) => {
        const response = await axios.delete("https://todoserver-pojm.onrender.com", { data: { todoitem: todoitem } },);
        todo();
    }

    useEffect(() => {
        todo();
    }, []);

    return (
        <div>
            <h1 className="title">To do list</h1>
            {todos.map((todo, index) => {
                return (
                    <div key={index} className="todo-container">
                        <h2>{todo}</h2>
                        <img src={editimg} className="edit-img" onClick={() => {
                            seteditmode(true); setoldtodo(todo); setnewtodo(todo);
                        }}></img>
                        <img src={imgdelete} className="delete-icon" onClick={() => {
                            undo(todo);
                        }}></img>
                    </div>
                );
            })}
            <div className="container">
                <input type="text" placeholder="add task" className="input-task" value={newtodo} onChange={(e) => {
                    setnewtodo(e.target.value);
                }}></input>
                <button className="btn-add" onClick={() => {
                    if (editmode) {
                        edit();
                    } else {
                        add();
                    }
                }}>
                    {editmode ? "Update Todo" : "Add Todo"}
                </button>
            </div>
        </div>
    );
}

export default App
