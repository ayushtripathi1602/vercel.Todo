import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-black text-white py-2' >
        <div className="logo">
            <span className='font-bold text-3xl mx-9'>Itask</span>
        </div>
        <ul className="flex gap-8 mx-9">
            <li className='cursor-pointer hover:text-red-600 hover:font-bold transition-all'>HOme</li>
            <li className='cursor-pointer  hover:text-red-600 hover:font-bold transition-all ' >your Task</li>
        </ul>
    </nav>
  )
}

export default Navbar
