import React from 'react'
import RiderNavbar from '../components/RiderNavbar'
import Orders from './orders/page'

const Rider = () => {
    
  return (
      <div
      className='bg-gray-100 h-screen w-full flex justify-center items-center'
      >
          <RiderNavbar />
          <Orders />

    </div>
  )
}

export default Rider