import React, { useState, useEffect } from 'react'


async function deletefromdeletedtodos(data) {
  await fetch("http://localhost:3000/deletefromdeletedtodos", {
        method: "DELETE", 
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(data)
      });
}
 
const Deleted = () => {
  const [todos, setTodos] = useState([])
  useEffect(() => {
    let todo = JSON.parse(localStorage.getItem("todos"))
    if (todo) {
      setTodos(todo)
    }
  }, [])
  const saveData = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos))
}
  const [deleted_todos, setdeleted_todos] = useState([])
  useEffect(() => {
    const deleted = JSON.parse(localStorage.getItem("deletedtodos"))
    if (deleted) {
      setdeleted_todos(deleted)
    }
  }, [])
  const savedeleteddata = (deleted) => {
    localStorage.setItem("deletedtodos", JSON.stringify(deleted))
  }
  const checkboxChange = (i) => {
    const name = i;
    deleted_todos.map((el) => {
      if (el.name === i) {
        el.isdone = !el.isdone
      }
    })
    setdeleted_todos([...deleted_todos])
    console.log(deleted_todos)
  }
  const handleDelete = (name) => {
    const delted_after_deleted_todos = []
    deleted_todos.map((item) => {
      if (item.name !== name) {
        delted_after_deleted_todos.push(item)
      }
      else {
        deletefromdeletedtodos(item)
      }
    })
    setdeleted_todos(delted_after_deleted_todos)
    savedeleteddata(delted_after_deleted_todos)
  }
  const restoretodo = (item) => {
    const new_todos = [...todos]
    const new_deleted_todos=[]
    const name = item.name
    deleted_todos.map((item) => {
      if (item.name === name) {
        item.isdone=false
        new_todos.push(item)
      }
      else {
        new_deleted_todos.push(item)
      }
    })
    setdeleted_todos(new_deleted_todos)
    setTodos(new_todos)
    savedeleteddata(new_deleted_todos)
    saveData(new_todos)
  }

  return (
    <>
      <div className={'main-body w-full bg-blue-300 min-h-[calc(100vh-80px)] flex flex-col items-center gap-2 absolute '} ><div className={'main-body w-full bg-blue-300 p-2 flex flex-col items-center gap-2 absolute t transition-all duration-1000 ease-in-out '}>
      {deleted_todos.length==0 && <div className='w-fit h-fit p-2 bg-gray-800 rounded-sm'> <h1 className='font-bold text-xl text-white'>No deleted Todos yet !</h1></div>}
        {deleted_todos.map((t) => (
          <div key={t.name} className='w-full flex justify-center h-10 gap-4'>
            <input type="checkbox" name={t.name} checked={t.isdone} onChange={() => checkboxChange(t.name)} />
            <div className={t.isdone ? 'line-through flex items-center md:font-bold md:text-xl p-2 rounded-sm w-[80%] bg-white ' : 'flex items-center font-bold text-xl p-2 rounded-sm w-[80%] bg-white'} >{t.title}</div>
            <div className="edit-delete-container flex gap-1">
              <button name={t.name} onClick={() => handleDelete(t.name)} className='bg-blue-800 p-3 rounded-md font-bold text-white flex justify-center items-center'>Delete</button>
              <button onClick={() => restoretodo(t)} className='bg-blue-800 p-3 rounded-md font-bold text-white flex justify-center items-center'>restore</button>
            </div>
          </div>
        ))}
      </div></div>
    </>
  )
}

export default Deleted