"use client";

import React, { useEffect } from 'react'
import { useState } from 'react'
import TailorNavbar from '@/app/components/TailorNavbar'
import axios from 'axios';
import { useRouter } from 'next/navigation';

const PostDelivery = ({ searchParams }) => {

    const userName = searchParams.user;
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [riderName, setRiderName] = useState('');
    const [orderTime, setOrderTime] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [startDestination, setStartDestination] = useState('');
    const [endDestination, setEndDestination] = useState('');

    const router = useRouter();

    const riderDetails = [
        {
            riderName: 'Ali',
            riderPhone: '03001234567',
            riderLocation: 'Gulberg',
            'riderStatus': 'Available',
            'averageFair': '500'
        },
        {
            riderName: 'Ahmed',
            riderPhone: '03001234567',
            riderLocation: 'Johar Town',
            'riderStatus': 'Available',
            'averageFair': '500'
        },
        {
            riderName: 'Bilal',
            riderPhone: '03001234567',
            riderLocation: 'Model Town',
            'riderStatus': 'Available',
            'averageFair': '500'
        }
    ]

    const [riders, setRiders] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/rider/riders')
            .then((res) => {
                setRiders(res.data);
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }, [])

    const handleOrder = async() => {
        console.log('Order Details: ', {
            userName,
            productName,
            productDescription,
            productPrice,
            riderName,
            orderTime,
            orderDate,
            startDestination,
            endDestination
        })
        const res = await axios.post('http://localhost:3001/api/order/create', {
            userName,
            productName,
            productDescription,
            productPrice,
            riderName,
            orderTime,
            orderDate,
            startDestination,
            endDestination
        });
        console.log('Order Response: ', res.data);
        alert('Order Posted Successfully');
        router.push('/tailor');
    }


    return (
        <div
            className='flex flex-col w-full h-screen bg-gray-100'
        >
            <TailorNavbar />
            {/* div for main content */}
            <div
                className='flex flex-col justify-center items-center mt-20'
            >
                <h1 className="text-2xl font-semibold text-center my-4 text-blue-600">
                    Post Delivery Details
                </h1>
                <div
                    className='w-full px-6 md:w-1/2 flex flex-col gap-4 py-4'
                >
                    {/* input for product name */}
                    <input
                        type='text'
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Product Name"
                        className="px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                    />

                    {/* input for product description */}
                    <textarea
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        placeholder="Product Description"
                        className="px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                    >
                    </textarea>

                    {/* input for product price */}
                    <input
                        type='number'
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        placeholder="Product Price"
                        className="px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                    />

                    {/* select for rider */}
                    <select
                        value={riderName}
                        onChange={(e) => setRiderName(e.target.value)}
                        className="px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                    >
                        <option value="">Select Rider</option>
                        {
                            riders.map((rider, index) => (
                                <option key={rider._id} value={rider.riderName}>
                                    {rider.username} - {rider.location}
                                </option>
                            ))
                        }
                    </select>

                    {/* input for delivery time */}
                    <input
                        type='time'
                        value={orderTime}
                        onChange={(e) => setOrderTime(e.target.value)}
                        placeholder="Delivery Time"
                        className="px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                    />

                    {/* input for delivery date */}
                    <input
                        type='date'
                        value={orderDate}
                        onChange={(e) => setOrderDate(e.target.value)}
                        placeholder="Delivery Date"
                        className="px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                    />

                    {/* input for start destination */}
                    <input
                        type='text'
                        value={startDestination}
                        onChange={(e) => setStartDestination(e.target.value)}
                        placeholder="Start Destination"
                        className="px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                    />

                    {/* input for end destination */}
                    <input
                        type='text'
                        value={endDestination}
                        onChange={(e) => setEndDestination(e.target.value)}
                        placeholder="End Destination"
                        className="px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                    />

                    {/* button to submit the form */}
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-md
                        w-fit focus:outline-none
                        "
                        onClick={handleOrder}
                    >
                        Post Delivery
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PostDelivery