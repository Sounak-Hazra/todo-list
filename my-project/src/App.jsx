import React from 'react';
import Nav from './components/Nav';
import Todolist from './components/Todolist';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export default App;
