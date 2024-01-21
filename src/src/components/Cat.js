import React from 'react'
import { useAuth } from '../context/AuthContext'

const Cat = () => {
    const {sampleCategories} = useAuth()
  return (
    <div className='grid place-items-center h-[85vh] bg-slate-900 px-4'>
         <h2 className='font-bold text-4xl uppercase text-white'>Categories</h2>
      <ul className=' grid place-items-center gap-3 w-full'>
        {sampleCategories.map((category, index) => (
          <li key={index} className='btn w-full'>
            {category}</li>
        ))}
      </ul>
    </div>
  )
}

export default Cat