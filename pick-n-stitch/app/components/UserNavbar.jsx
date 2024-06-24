"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineUser } from 'react-icons/ai';
// import logout icon from react icons
import { AiOutlineLogout } from 'react-icons/ai';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const email = localStorage.getItem('email');

    return (
        <nav className='bg-white
         shadow-lg fixed top-0 z-[5000] w-full
         text-blue-600
         '>
            <div className='max-w-7xl mx-auto px-2 sm:px-4 lg:px-8'>
                <div className='relative flex items-center justify-between h-16'>
                    <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                            aria-expanded='false'
                        >
                            <span className='sr-only'>Open main menu</span>
                            <svg
                                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                aria-hidden='true'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M4 6h16M4 12h16M4 18h16'
                                />
                            </svg>
                            <svg
                                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                aria-hidden='true'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M6 18L18 6M6 6l12 12'
                                />
                            </svg>
                        </button>
                    </div>
                    <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                        <div className='flex-shrink-0 flex items-center'>
                            <Image
                                src='/images/logo1.png'
                                alt='Logo'
                                width={400}
                                height={100}
                                color='black'
                                className='block lg:hidden h-8 w-auto'
                            />
                            <Image
                                src='/images/logo1.png'
                                alt='Logo'
                                width={400}
                                height={100}
                                color='black'
                                className='hidden lg:block h-full w-auto'
                            />
                        </div>
                        <div className='hidden sm:flex sm:ml-12'>
                            <div className='flex items-center justify-center space-x-4'>
                                <Link href='/user'
                                    className='text-blue-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                                >
                                    Home
                                </Link>
                                <Link href='/user/nearby-tailors'
                                    className='text-blue-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                                >
                                        Nearby Tailors
                                    
                                </Link>
                                <Link href='/user/trendy-designs'
                                    className='text-blue-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                                >
                                    
                                    Trendy Designs
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                        <div className='ml-3 relative'>
                            <div>
                                <button
                                    className='flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out'
                                    id='user-menu'
                                    aria-label='User menu'
                                    aria-haspopup='true'
                                >
                                    <AiOutlineUser className='text-blue-600 h-6 w-6' />
                                </button>
                            </div>
                        </div>
                        <div className='hidden sm:block sm:ml-6'>
                            <div className='flex items-center'>
                                <div className='text-sm font-medium leading-none text-blue-600'>
                                    {email}
                                </div>
                            </div>
                        </div>

                        <div className='hidden sm:block sm:ml-6'>
                            <div className='flex items-center'>
                                <Link href='/'
                                    className='text-blue-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                                >
                                    <AiOutlineLogout className='h-5 w-5 inline-block mr-1' /> Logout
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
            {/*
            Navbar for mobile view
            */}
            
            <div className={`${isOpen ? 'flex' : 'hidden'} sm:hidden`}>
                <div className='px-2 pt-2 pb-3 space-y-1'>
                    <Link href='/user'
                        className='text-gray-900 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                    >
                        Home
                    </Link>
                    <Link href='/user/nearby-tailors'
                        className='text-gray-900 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                    >
                        Nearby Tailors

                    </Link>
                    <Link href='/user/trendy-designs'
                        className='text-gray-900 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                    >

                        Trendy Designs
                    </Link>
                </div>
            </div>
        </nav>
    );
}
