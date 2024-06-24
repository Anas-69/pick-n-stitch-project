"use client";

import Navbar from '@/app/components/UserNavbar';
import Image from 'next/image';
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

const UserOrderPage = ({ searchParams }) => {
  const { productImage, productName, productPrice, productDescription } = searchParams;
  const [userName, setUserName] = useState('');
  const [riders, setRiders] = useState([]);
  const [selectedRider, setSelectedRider] = useState('');
  const [startDestination, setStartDestination] = useState('');
  const [endDestination, setEndDestination] = useState('');
  const [orderTime, setOrderTime] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(productPrice + 500);

  const locationOptions = [
    'Gujrat',
    'Kharian',
    'Sarai Alamgir',
    'Lalamusa',
    'Jalalpur Jattan',
    'Dinga',
    'Kunjah',
    'Kharian Cantonment',
    'Jamalpur Syedan',
    'Bakhshupura',
  ];

  

  useEffect(() => {
    const email = localStorage.getItem('email');
    const fetchUserName = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/user/users/${email}`);
        setUserName(res.data.username);
      }
      catch (err) {
        console.log(err);
      }
    }

    fetchUserName();
  }
    , []);
  
  
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/rider/riders')
      .then((res) => {
        setRiders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
    , []);
  
  const handleOrder = () => {
    if (selectedRider === 'Select Rider') {
      alert('Please select a rider');
      return;
    }
    axios
      .post('http://localhost:3001/api/order/create', {
        userName,
        productName,
        productDescription,
        productPrice : totalPrice,
        riderName: selectedRider,
        startDestination,
        endDestination,
        orderTime,
        orderDate,
      })
      .then((res) => {
        alert('Order placed successfully');
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.message);
      });
  }
  

  return (
      <div
      className='flex flex-col w-full h-full bg-gray-50'
      >
          <Navbar />
          <h1
          className='mt-20 mx-auto py-4 text-xl font-bold text-blue-600'
      >Order Summary
      </h1>
      <div
      className='flex justify-center gap-12 mt-4 mb-8'
      >
        <div
          className='flex flex-col items-center bg-white shadow-md rounded-lg p-4 mt-4 w-11/12 md:w-1/2 lg:w-1/4 h-full my-4'
        >
          <Image src={productImage} alt={productName}
            width={200}
            height={200}
            className='rounded-lg'
          />
          <h2
            className='font-bold text-lg mt-4 mb-2 text-gray-800'
          >Product name : {productName}</h2>
          <p
            className='font-bold text-lg mt-1 mb-2 text-gray-800'
          >Price: {productPrice}</p>
          <p
            className='font-bold text-lg mt-1 mb-2 text-gray-800'
          >Description: {productDescription}</p>
        </div>

        <div className='flex flex-col items-center bg-white shadow-md rounded-lg p-4 mt-4 w-11/12 md:w-1/2 lg:w-1/4 h-full my-4'>

          {/* Checkout card input fields */}

          <div
          className='mt-1 mb-2 text-gray-800'
          >
            User Name : 
            <span
            className='font-bold text-lg mt-1 mb-2 text-gray-800'
            >
            {userName}
          </span>
          </div>

          {/* product Name */}
          <div
            className='mt-1 mb-2 text-gray-800'
          >
            Product Name:
            <span
              className='font-bold text-lg'
            >
            {productName}
            </span>
          </div>

          {/* Start Destination */}
          <select
            className='border-2 border-gray-400 rounded-md mt-4'
            value={startDestination}
            onChange={(e) => setStartDestination(e.target.value)}
          >
            <option>Select Start Destination</option>
            {
              locationOptions.map((location, index) => (
                <option key={index}>{location}</option>
              ))
            }
          </select>

          {/* End Destination */}
          <select
            className='border-2 border-gray-400 rounded-md mt-4'
            value={endDestination}
            onChange={(e) => setEndDestination(e.target.value)}
          >
            <option>Select End Destination</option>
            {
              locationOptions.map((location, index) => (
                <option key={index}>{location}</option>
              ))
            }
          </select>

          <select
            className='border-2 border-gray-400 rounded-md mt-4'
            value={selectedRider}
            onChange={(e) => setSelectedRider(e.target.value)}
          >
            <option>Select Rider</option>
            {
              riders.map((rider, index) => (
                <option key={index}>{rider.username}</option>
              ))
            }
          </select>

          {/* OrderTime */}
          <input
            type='time'
            className='border-2 border-gray-400 rounded-md mt-4'
            value={orderTime}
            onChange={(e) => setOrderTime(e.target.value)}
          />

          {/* OrderDate */}
          <input
            type='date'
            className='border-2 border-gray-400 rounded-md mt-4'
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
          />

          <div
          className='mb-2 text-gray-800 flex flex-col gap-4 mt-8'
          >
            Total Price Summery
            <span>
              Product Price: {productPrice}
            </span>
            <span>
              Delivery Charges: 500
            </span>
            <span>
              Total Price: {parseInt(productPrice) + 500}
            </span>
          </div>



          <button
            className='bg-blue-500 text-white rounded-lg p-2 mt-4'
            onClick={handleOrder}
          >Check Out</button>
        </div>

        
      </div>
    </div>

  )
}

export default UserOrderPage