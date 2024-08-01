import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
    const [sideelements, setsideelements] = useState("top-[-100vh]")
    const hambargerclicked = () => {
        sideelements == "top-[-100vh]" ? setsideelements("top-0") : setsideelements("top-[-100vh]")
        console.log(sideelements)

    }

    return (
        <>
            <nav className='flex bg-purple-700 w-[100vw] h-20 min-h-16 justify-between items-center relative'>
                <div className="logo w-fit h-fit bg-black text-xl font-bold text-white mx-2 rounded-md p-2">NOTHING</div>
                <div onClick={hambargerclicked} className="hambarger md:hidden absolute right-3 p-2 rounded-sm hover:bg-purple-950">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                        <path d="M4 5L20 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M4 12L20 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M4 19L20 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <div className={`container w-1/2 md:h-[8vh] h-screen flex items-center absolute md:relative md:top-0 ${sideelements} md:right-0 bg-slate-700 md:bg-inherit  md:flex-row h-fit z-10 transition-all duration-1000 ease-in-out `}>

                    <ul className='flex md:justify-around justify-start p-4 gap-4 md:h-full  md:w-full w-60 h-screen items-center flex-col md:flex-row md:p-0 '>
                        <li className='md:w-fit w-full flex justify-center bg-black text-white p-2 md:h-fit rounded-md font-bold hover:bg-gray-900 transition-all duration-200 ease-in-out' ><NavLink to="/" isActive={() => className = "bg-red"}>Todos</NavLink></li>
                        <li className='md:w-fit w-full flex justify-center bg-black text-white p-2 md:h-fit rounded-md font-bold hover:bg-gray-900 transition-all duration-200 ease-in-out' ><NavLink to="/finished">Finished Todos</NavLink></li>
                        <li className='md:w-fit w-full flex justify-center bg-black text-white p-2 md:h-fit rounded-md font-bold hover:bg-gray-900 transition-all duration-200 ease-in-out'  ><NavLink to="/delete">Deleted Todos</NavLink></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Nav
