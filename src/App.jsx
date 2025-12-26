import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios"; // Removed Axios from import as it wasn't used
import deleteicon from "./assets/delete.png";
import editicon from "./assets/edit.png";

function App() {

    const [todos, setTodos] = useState([]);
    const [oldtodo, setoldtodo] = useState("");
    const [editmode, seteditmode] = useState(false); // Changed default string "false" to boolean false
    const [newtodo, setnewtodo] = useState("");

    // Ensure environment variable VITE_BASE_URL is defined correctly in your .env file
    const BASE_URL = import.meta.env.VITE_BASE_URL; 

    // Function to fetch all todos
    const todo = async () => {
        try {
            console.log("Loading todos from:", BASE_URL);
            // Assuming the base URL is the correct endpoint for a GET request
            const response = await axios.get(BASE_URL); 
            setTodos(response.data.data || []); // Added fallback to empty array
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    // Function to add a new todo
    const add = async () => {
        try {
            // Corrected syntax: removed trailing comma in URL and data
            await axios.post(BASE_URL, { todoitem: newtodo }); 
            setnewtodo("");
            todo(); // Refresh the list
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    }

    // Function to edit an existing todo
    const edit = async() => {
        try {
            // Corrected syntax and structure. Assuming backend handles update at BASE_URL
            await axios.put(BASE_URL, {
                "oldtodoitem": oldtodo,
                "newtodoitem": newtodo,
            });
            todo(); // Refresh the list
            seteditmode(false);
            setnewtodo("");
            setoldtodo("");
        } catch (error) {
            console.error("Error editing todo:", error);
        }
    }

    // Function to delete a todo
    const undo = async (todoitem) => {
        try {
            // Corrected syntax: data key inside config object, no trailing commas
            await axios.delete(BASE_URL, { data: { todoitem: todoitem } }); 
            todo(); // Refresh the list
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    }

    // Fetch todos on component mount
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
                        <img src={editicon} className="edit-img" onClick={() => {
                            seteditmode(true); setoldtodo(todo); setnewtodo(todo);
                        }} alt="Edit"></img> 
                        <img src={deleteicon} className="delete-icon" onClick={() => {
                            undo(todo);
                        }} alt="Delete"></img>
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

export default App;
