"use client";
import RiderNavbar from '@/app/components/RiderNavbar';
import Link from 'next/link';
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

const Order = ({ searchParams }) => {
    const [isAccepted, setIsAccepted] = useState(false);

    const orderId = searchParams.id;
    const [orderDetails, setOrderDetails] = useState({});
    useEffect(() => {
        // localhost:3001/api/order/6629eabc6b241a20f21f2f48 (call this api)
        axios.get(`http://localhost:3001/api/order/${orderId}`)
            .then((res) => {
                setOrderDetails(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [orderId])
    
    const handleOrder = async () => {
        // localhost:3001/api/order/change-order-status/${orderId}
        try {
            const res = await axios.put(`http://localhost:3001/api/order/change-order-status/${orderId}`);
            if (res.status === 200) {
                setIsAccepted(true);
            }
        } catch (err) {
            console.log(err.response.data);
        }
        
    }


    return (
        <div
            className='bg-gray-100 h-screen w-full flex justify-center items-center'
        >
            <RiderNavbar />
            <div className='container mx-auto px-4 md:px-0'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-2xl font-bold'>Order Details</h1>
                    <Link
                        href={`/rider`}
                        className='bg-blue-500 text-white px-4 py-2 rounded-md'>Back</Link>
                </div>

                <div className='flex flex-col md:flex-row justify-between items-center mt-4'>
                    <div>
                        <p className='text-sm font-bold'>
                            Customer Name
                        </p>
                        <p className='text-sm'>{orderDetails.userName}</p>
                    </div>
                    <div>
                        <p className='text-sm font-bold'>Order ID</p>
                        <p className='text-sm'>{orderId}</p>
                    </div>
                    <div>
                        <p className='text-sm font-bold'>Order Date</p>
                        <p className='text-sm'>
                            {orderDetails.orderDate}
                        </p>
                    </div>
                    <div>
                        <p className='text-sm font-bold'>Status</p>
                        <p className='text-sm'>
                            {orderDetails.orderStatus}
                        </p>
                    </div>
                </div>

                <div className='flex flex-col md:flex-row justify-between items-center mt-4'>
                    <div>
                        <p className='text-sm font-bold'>Start Location</p>
                        <p className='text-sm'>
                            {orderDetails.startDestination}
                        </p>
                    </div>
                    <div>
                        <p className='text-sm font-bold'>End Destination</p>
                        <p className='text-sm'>
                            {orderDetails.endDestination}
                        </p>
                    </div>
                </div>

                <div className='flex flex-col md:flex-row justify-between items-center mt-4'>
                    <div>
                        <p className='text-sm font-bold'>Product Name</p>
                        <p className='text-sm'>
                            {orderDetails.productName}
                        </p>
                    </div>
                    <div>
                        <p className='text-sm font-bold'>Product Price</p>
                        <p className='text-sm'>
                            {orderDetails.productPrice}
                        </p>
                    </div>
                </div>

                <div className='mt-4'>
                    <p className='text-sm font-bold'>Product Description</p>
                    <p className='text-sm'>
                        {orderDetails.productDescription}
                    </p>
                </div>

                <button
                    className='bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full'
                    onClick={handleOrder}
                >
                    {
                        isAccepted ? (
                            'Order Accepted'
                        ) : (
                            'Accept Order' )
                    }
                </button>
            </div>
        </div>
    )
}

export default Order
