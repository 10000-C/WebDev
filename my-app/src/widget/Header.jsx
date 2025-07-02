import React from 'react'
import Button from '../components/Button'
function Header() {
  return (
    <div className='flex justify-between items-center h-10'>
      <div className='flex items-center'>
        <img
           src="src/assets/react.svg"
           alt="logo"
           className='h-8 w-8'
        />
        <h1 className='ml-4 text-4xl font-black text-black'>Baller</h1>
      </div>
      <nav className='flex items-center'>
          <a href='#' className='mr-4'>
            <Button variant='outline' size='md'>Login</Button>
          </a>
          <a href='#'>
            <Button variant='primary' size='md'>Register</Button>
          </a>
      </nav>
    </div>
  )
}

export default Header