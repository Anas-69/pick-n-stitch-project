import Link from 'next/link';
import React from 'react'
import { AiOutlineUser, AiOutlineEnvironment, AiOutlineDollarCircle, AiOutlinePhone } from 'react-icons/ai';

const Tailors = () => {
    const tailors = [
        {
            name: 'Ahmed Khan', location: 'Karachi', avgPrice: '2799', phone: '+923001234567',
        },
        {
            name: 'Bilal Hussain', location: 'Lahore', avgPrice: '3499', phone: '+923009876543',
        },
        {
            name: 'Sara Malik', location: 'Islamabad', avgPrice: '2199', phone: '+923004321098',
        },
    ]

    return (
        <div className='w-full h-full flex flex-col items-center bg-gray-50'>
            <h1 className='mt-12 text-4xl font-bold text-blue-600'>
                Nearby Tailors
            </h1>

            <hr
                className='w-1/2 mt-4 mb-8 border-2 border-blue-600'
            />

            <div className='flex flex-wrap justify-center mt-10'>
                {tailors.map((tailor, index) => (
                    <div key={index} className='m-4 bg-white shadow-md rounded-lg overflow-hidden max-w-xs md:max-w-sm lg:max-w-md'>
                        <div className='p-12'>
                            <h2 className='font-bold text-2xl mb-2'><AiOutlineUser className='inline-block mr-2' />{tailor.name}</h2>
                            <p><AiOutlineEnvironment className='inline-block mr-2' /><strong>Location:</strong> {tailor.location}</p>
                            <p><AiOutlineDollarCircle className='inline-block mr-2' /><strong>Average Price:</strong> {tailor.avgPrice}</p>
                            <p><AiOutlinePhone className='inline-block mr-2' /><strong>Phone:</strong> {tailor.phone}</p>
                        </div>
                        <div className='text-center flex justify-center p-4 bg-gray-100 rounded-b-lg'>
                            <button className='text-sm font-semibold text-blue-700 hover:text-blue-900'>
                                Chat with {tailor.name}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Explore all */}
            <Link
                href='/user/nearby-tailors'
            >
                <button
                    className='mt-8 bg-blue-600 text-white px-4 py-2 rounded-lg
                    hover:bg-blue-700
                    w-[200px]
                    '
                >
                    Explore All
                </button>
            </Link>

        </div>
    )
}

export default Tailors
