import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Trash, SquarePen } from 'lucide-react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setnewTodo] = useState("");
  const [oldTodo, setOldTodo] = useState("");
  const [editMode, setEditMode] = useState(false);
const baseUrl=import.meta.env.VITE_BASE_URL;

  const loadTodos = async () => {
    console.log("Loading todos...");
    const response = await axios.get(`${baseUrl}/todos`);

    setTodos(response.data.data);
  }
  const addTodo = async () => {
    const response = await axios.post(`${baseUrl}/todos`, { "todoItems": newTodo });
    setnewTodo("");
    loadTodos();

  }
  const deleteTodo = async (todoItem) => {
    const response = await axios.delete(`${baseUrl}/todos`, {
      data: { todoItem },
    });
    loadTodos();
  }

  const editTodo = async () => {
    const response = await axios.put(`${baseUrl}/todos`, {
      "newTodoItem": newTodo,
      "oldTodoItem": oldTodo

    })
    loadTodos();
    setEditMode(false);
    setnewTodo("");
    setOldTodo("");
  }
  useEffect(() => {
    loadTodos();
  }, []);
  return (
    <div className='bg-[#EAE0CF] min-h-[100vh] ' >
      <h1 className='text-4xl text-[#213448] font-bold text-center p-[20px]'>ToDo list</h1>

      <div className='flex flex-col justify-center items-center w-full h-[400px] scroll-auto overflow-y-scroll '>
        {
          todos.map((todo, index) => {
            return (
              <div key={index} className='w-[90%] md:w-[70%] border-1 px-[20px] py-[15px] m-[10px] rounded-[10px] flex justify-between items-center text-[18px] bg-[#94B4C1]'>
                <p>{todo}</p>
                <div className='flex gap-2 items-center '
                 >
                  <SquarePen className='h-[25px] cursor-pointer'  onClick={() => {
                    setEditMode(true);
                    setOldTodo(todo);
                    setnewTodo(todo);
                  }

                  } />
                  <Trash onClick={() => deleteTodo(todo)} className='cursor-pointer h-[25px]  text-red-700 ' /></div>
              </div>
            )
          })
        }

      </div>
      <div className='w-[100%] bg-[#EAE0CF] fixed bottom-0 right-0 left-0 flex justify-center items-center gap-2'>
        <input type="text" placeholder='Add task' value={newTodo} onChange={(e) => {
          setnewTodo(e.target.value);
        }}
          className='m-[20px] p-[10px] outline-none rounded-lg border-1 w-[50%] md:w-[50%] border-[#213448]' />
        <button className='border text-[14px] md:text-[16px] rounded-[8px] p-[10px] text-[#213448] font-bold cursor-pointer' onClick={() => {
          if (editMode) {
            editTodo();
          }
          else {
            addTodo();
          }
        }}>{editMode ? "Update TODO" : "Add TODO"}</button>
      </div>


    </div>

  )
}

export default App