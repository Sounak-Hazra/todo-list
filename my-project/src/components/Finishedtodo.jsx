import React, { useState, useEffect } from 'react';
import DeleteSvg from "../assets/delete-02-stroke-rounded.svg"
import restore from "../assets/restore.svg"



async function restorefromfinished(data) {
    console.log(data)
    await fetch("http://localhost:3000/restorefromfinished", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(data)
      });
}
async function deletefromfinishedtodos(data) {
    console.log(data)
    await fetch("http://localhost:3000/deletefromfinishedtodos", {
        method: "DELETE", 
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(data)
      });
}
async function changeidone(data) {
    console.log(data)
    await fetch("http://localhost:3000/changeidone", {
        method: "PUT", 
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(data)
      });
}

const Finishedtodo = (props) => {
    const { position: page } = props;
    const [finishedTodos, setFinishedTodos] = useState([]);
    const [todos, setTodos] = useState([]);
    const [deletedTodos, setdeletedtodos] = useState([])

    useEffect(() => {
        const storedFinishedTodos = JSON.parse(localStorage.getItem("finishedtodos")) || [];
        setFinishedTodos(storedFinishedTodos);
        console.log(finishedTodos)
    }, []);
    useEffect(() => {
        let alredy_deleted = JSON.parse(localStorage.getItem("deletedtodos"))
        if (alredy_deleted) {
            setdeletedtodos(alredy_deleted)
        }
    }, [])
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem("todos"));
        setTodos(storedTodos);
    }, []);

    const saveFinishedData = (finishedtodos) => {
        localStorage.setItem("finishedtodos", JSON.stringify(finishedtodos));
    }
    const savedeleteddata = (deleted) => {
        localStorage.setItem("deletedtodos", JSON.stringify(deleted))
    }
    const handleDelete = (name) => {
        const deleted = [...deletedTodos]
        const updatedFinishedTodos = finishedTodos.filter((t) => {
            if (t.name !== name) {
                return true;
            } else {
                deleted.push(t);
                deletefromfinishedtodos(t)
                return false;
            }
        });
        setFinishedTodos(updatedFinishedTodos);
        saveFinishedData(updatedFinishedTodos);
        setdeletedtodos(deleted)
        savedeleteddata(deleted)

    }


    const checkboxChange = (name) => {
        const updatedFinishedTodos = finishedTodos.map(item => {
            if (item.name === name) {
                item.isdone = !item.isdone;
                changeidone(item)
            }
            return item;
        });
        setFinishedTodos(updatedFinishedTodos);
        saveFinishedData(updatedFinishedTodos);
    }
    const restoretodo = (item) => {
        const name = item.name
        const checkedfinnishedtodos = [];
        const new_checked_main_todos = [...todos]
        finishedTodos.map((i) => {
            if (i.name !== name) {
                checkedfinnishedtodos.push(i)
            }
            else {
                i.isdone ? i.isdone = !i.isdone : i.isdone = i.isdone
                new_checked_main_todos.push(i)
                restorefromfinished(i)
            }
        })
        console.log(new_checked_main_todos)
        setFinishedTodos(checkedfinnishedtodos)
        saveFinishedData(checkedfinnishedtodos)
        setTodos(new_checked_main_todos)
        localStorage.setItem("todos", JSON.stringify(new_checked_main_todos))
    }



    return (
        <div className={'main-body w-full bg-blue-300 p-2 min-h-[calc(100vh-80px)] flex flex-col items-center gap-2 absolute transition-all duration-1000 ease-in-out '}>
            {finishedTodos.length == 0 && <div className='w-fit h-fit p-2 bg-gray-800 rounded-sm'> <h1 className='font-bold text-xl text-white'>No Finished Todos yet !</h1></div>}
            {finishedTodos.map((t) => (
                <div key={t.name} className='w-full flex justify-center h-10 gap-4'>
                    <input type="checkbox" name={t.name} checked={t.isdone} onChange={() => checkboxChange(t.name)} />
                    <div className={t.isdone ? 'line-through flex items-center md:font-bold text-xl p-2 rounded-sm w-[80%] bg-white' : 'flex items-center md:font-bold md:text-xl p-2 rounded-sm w-[80%] bg-white'} >{t.title}</div>
                    <div className="edit-delete-container md:flex hidden gap-1">
                        <button name={t.name} onClick={() => handleDelete(t.name)} className='bg-blue-800 p-3 rounded-md font-bold text-white flex justify-center items-center'>Delete</button>
                        <button onClick={() => restoretodo(t)} className='bg-blue-800 p-3 rounded-md font-bold text-white flex justify-center items-center'>restore</button>
                    </div>
                    <div className="edit-delete-container flex gap-1 flex-col self-center ml-auto mr-1 md:hidden">
                        <button  >
                            <img onClick={() => { handleDelete(t.name) }} name={t.name} src={DeleteSvg} alt="" />
                        </button>
                        <button  >
                            <img src={restore} onClick={() => restoretodo(t)} name={t.name} alt="" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Finishedtodo;
