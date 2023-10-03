import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='bg-[#1a1c1d] h-[5rem] flex items-center px-[2rem] w-full shadow-sm'>
        <div className='flex'>
          <Link to='/' className='mr-[2rem]'>
            <h1 className='text-xl font-bold text-white'>GoldTracker</h1>
</Link>
        </div>

    </div>
  )
}

export default Header