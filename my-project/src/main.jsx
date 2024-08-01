import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Todolist from "./components/Todolist"
import Finishedtodo from "./components/Finishedtodo"
import Deleted from './components/Deleted';
import { createBrowserRouter ,RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{
      path: "",
      element: <Todolist />
    },
      {
        path: "finished",
        element: <Finishedtodo />
      },
      {
        path: "delete",
        element: <Deleted />
    }]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
