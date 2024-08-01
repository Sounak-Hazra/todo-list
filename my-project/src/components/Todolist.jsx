import React from 'react'
import { useState, useEffect } from 'react';
import uniqname from 'uniqid'
import DeleteSvg from "../assets/delete-02-stroke-rounded.svg"
import editsvg from "../assets/pencil-edit-01-stroke-rounded.svg"

async function addtodoindatabase(data) {
    console.log(data)
    await fetch("http://localhost:3000/posttodo", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(data)
      });
}
async function addfinishedtodo(data) {
    console.log(data)
    await fetch("http://localhost:3000/addfinishedtodod", {
        method: "DELETE", 
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(data)
      });
}
async function deletefrommaintodos(data) {
    console.log(data)
    await fetch("http://localhost:3000/deletefrommaintodos", {
        method: "DELETE", 
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(data)
      });
}

const Todolist = () => {
    const [todo, setTodo] = useState({ title: "", isdone: false, name: "" })
    const [todos, setTodos] = useState([])
    const [finishedtodos, setfinishedtodos] = useState([])
    const [deletedTodos, setdeletedtodos] = useState([])
    useEffect(() => {
        let todo = JSON.parse(localStorage.getItem("todos"))
        if (todo) {
            setTodos(todo)
        }
    }, [])
    useEffect(() => {
        let alredy_deleted = JSON.parse(localStorage.getItem("deletedtodos"))
        if (alredy_deleted) {
            setdeletedtodos(alredy_deleted)
        }
    }, [])


    useEffect(() => {
        let todo = JSON.parse(localStorage.getItem("todos"))
        let ftodos = JSON.parse(localStorage.getItem("finishedtodos"))
        if (todo) {
            setTodos(todo)
        }
        if (ftodos) {
            setfinishedtodos(ftodos)
        }
    }, [])
    const saveData = (todos) => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }
    const saveFinisheddata = (finishedtodos) => {
        localStorage.setItem("finishedtodos", JSON.stringify(finishedtodos))
    }
    const savedeleteddata = (deleted) => {
        localStorage.setItem("deletedtodos", JSON.stringify(deleted))
    }
    const inputchange = (e) => {
        setTodo({ ...todo, title: e.target.value });
    }
    const addtodo = (e) => {
        const data ={ title: todo.title, isdone: false, name: uniqname() }
        const updatedtodos = [...todos, data ]
        setTodos(updatedtodos)
        setTodo({ ...todo, title: "" })
        saveData(updatedtodos)
        addtodoindatabase(data)
    }
    const checkboxchange = (e) => {
        const newTodos = []
        const newfinishedtodos = JSON.parse(localStorage.getItem("finishedtodos")) ? JSON.parse(localStorage.getItem("finishedtodos")) : []
        todos.map(item => {
            if (e.target.name !== item.name) {
                newTodos.push(item);
            }
            else {
                item.isdone = true
                newfinishedtodos.push(item);
                addfinishedtodo(item);
            }
        });
        setTodos([...newTodos]);
        setfinishedtodos([...newfinishedtodos])
        saveData([...newTodos])
        saveFinisheddata([...newfinishedtodos])
    }
    const handledelete = (e) => {
        const newTodos = []
        const alredy_deleted = [...deletedTodos]
        todos.map(item => {
            if (e.target.name !== item.name) {
                newTodos.push(item);
            }
            else {
                alredy_deleted.push(item)
                deletefrommaintodos(item)
            }
        });
        setTodos([...newTodos]);
        saveData([...newTodos])
        setdeletedtodos([...alredy_deleted])
        savedeleteddata([...alredy_deleted])

    }
    const handleedit = (e) => {
        console.log("working")
        const newTodos = []
        todos.map(item => {
            if (e.target.name !== item.name) {
                newTodos.push(item);
            }
            else {
                setTodo(item)
            }
        });
        setTodos([...newTodos]);
        saveData([...newTodos])
    }
    return (
        <>
            <div className={'main-body w-full bg-blue-300 min-h-[calc(100vh-80px)] p-2 flex flex-col items-center gap-2 absolute'}>
                <div className=' rounded-sm todo-addbar w-[80%] min-h-10 p-5 bg-blue-500 flex justify-center gap-4'>

                    <input type="text" className='w-[80%] p-1 font-bold text-xl rounded-sm' value={todo.title} onChange={inputchange} />
                    <button onClick={addtodo} className='bg-blue-800  p-3 rounded-md font-bold text-white'>SAVE</button>
                </div>
                <div className="rounded-sm todolist todo-addbar w-[80%] min-h-fit p-5 bg-blue-500 flex justify-center flex-col gap-4">
                    {todos.length == 0 && <h1 className='font-bold text-white text-xl'>No Todos yet !</h1>}
                    {
                        todos.map((t) => {
                            return <div key={t.name} className='w-full flex justify-center  md:gap-4 gap-1 h-fit'>
                                <input type="checkbox" name={t.name} onChange={checkboxchange} checked={t.isdone} />
                                <div className={t.isdone ? 'line-through break-words flex h-fit items-center font-bold text-xl p-2 rounded-sm w-[80%] bg-white' : 'flex items-center h-fit md:font-bold md:text-xl p-2 rounded-sm w-[80%] bg-white  overflow-auto '} ><p className='whitespace-normal break-words'>{t.title}</p></div>
                                <div className="edit-delete-container md:flex gap-1 items-center  hidden">
                                    <button onClick={handleedit} name={t.name} className='bg-blue-800  p-3 rounded-md font-bold flex justify-center items-center text-white h-10 '>Edit    </button>
                                    <button onClick={handledelete} name={t.name} className='bg-blue-800  p-3 rounded-md font-bold text-white flex justify-center items-center h-10'>Delete</button>
                                </div>
                                <div className="edit-delete-container flex gap-1 flex-col self-center ml-auto mr-1 md:hidden">
                                    <button  >
                                        <img onClick={handledelete} name={t.name} src={DeleteSvg} alt="" />
                                    </button>
                                    <button  >
                                        <img src={editsvg} onClick={handleedit} name={t.name} alt="" />
                                    </button>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div >
        </>
    )
}

export default Todolist