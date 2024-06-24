"use client";

import React from 'react'
import Link from 'next/link'
import {useState, useEffect} from 'react'
import axios from 'axios';
import RiderNavbar from '@/app/components/RiderNavbar';

const Orders = () => {
  const ordersFromUsers = [
    {
      userName: 'John Doe',
      startLocation: 'Gulberg, Lahore',
      endLocation: 'DHA, Lahore',
      status: 'Pending',
      prodcutName: 'Shirt',
      productDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.',
      productPrice: 5000,
      orderDate: '2024-23-04'
    },
    {
      userName: 'Jane Doe',
      startLocation: 'Gulberg, Lahore',
      endLocation: 'DHA, Lahore',
      status: 'Pending',
      prodcutName: 'Shirt',
      productDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.',
      productPrice: 5000,
      orderDate: '2024-23-04'
    },
    {
      userName: 'John Doe',
      startLocation: 'Gulberg, Lahore',
      endLocation: 'DHA, Lahore',
      status: 'Pending',
      prodcutName: 'Shirt',
      productDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.',
      productPrice: 5000,
      orderDate: '2024-23-04'
    },
    {
      userName: 'Jane Doe',
      startLocation: 'Gulberg, Lahore',
      endLocation: 'DHA, Lahore',
      status: 'Pending',
      prodcutName: 'Shirt',
      productDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.',
      productPrice: 5000,
      orderDate: '2024-23-04'
    },
    {
      userName: 'John Doe',
      startLocation: 'Gulberg, Lahore',
      endLocation: 'DHA, Lahore',
      status: 'Pending',
      prodcutName: 'Shirt',
      productDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.',
      productPrice: 5000,
      orderDate: '2024-23-04'
    },
    {
      userName: 'Jane Doe',
      startLocation: 'Gulberg, Lahore',
      endLocation: 'DHA, Lahore',
      status: 'Pending',
      prodcutName: 'Shirt',
      productDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.',
      productPrice: 5000,
      orderDate: '2024-23-04'
    }
  ]

  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:3001/api/order');
      setOrdersData(res.data);
    }
    fetchData();
  }, [])

  return (

    <div
      className='mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-full max-w-7xl'
    >
      {ordersData.map((order, index) => (
        <div
          key={index}
          className='bg-white p-4 shadow-md rounded-md relative'
        >
          <h1 className='text-xl font-semibold'>{order.userName}</h1>
          <p className='text-sm text-gray-500'>From: {order.startDestination} - To : {order.endDestination}</p>
          <p className='text-sm text-gray-500'>Status: {order.orderStatus}</p>
          <p className='text-sm text-gray-500'>Product: {order.productName}</p>
          <p className='text-sm text-gray-500'>Description: {order.productDescription}</p>
          <p className='text-sm text-gray-500'>Price: {order.productPrice}</p>
          <p className='text-sm text-gray-500'>Order Date: {order.orderDate}</p>
          {
            order.orderStatus === "Pending" ? (
              <Link
                href={{
                  pathname: '/rider/order',
                  query: { id: order._id }
                }}
                className='text-md text-white bg-blue-600 p-2 rounded-md
                            w-fit
                            absolute top-4 right-4
                            '
              >
                View Order
              </Link>
            ) : null
          }
        </div>
      ))}

    </div>

  )
}

export default Orders