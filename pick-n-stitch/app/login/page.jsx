"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // store the user data in the local storage
        localStorage.setItem('email', email);
        localStorage.setItem('role', role);

        if (role === 'user') {
            try {
                const res = await axios.get('http://localhost:3001/api/user/login', {
                    params: { email, password, role },
                });

                if (res.status === 200 && res.data) {
                    router.push('/user');
                } else {
                    alert('Invalid Credentials');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        if (role === 'tailor') {
            try {
                const res = await axios.get('http://localhost:3001/api/tailor/login', {
                    params: { email, password, role },
                });

                if (res.status === 200 && res.data) {
                    router.push('/tailor');
                } else {
                    alert('Invalid Credentials');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        if (role === 'rider') {
            try {
                const res = await axios.get('http://localhost:3001/api/rider/login', {
                    params: { email, password, role },
                });

                if (res.status === 200 && res.data) {
                    router.push('/rider');
                } else {
                    alert('Invalid Credentials');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div
            className='w-full h-screen flex flex-col items-center justify-center bg-gray-50'
        >
            <div className='w-96 bg-secondary p-8 rounded-lg shadow-lg shadow-gray-500 '>
                <h1 className='text white text-2xl font-semibold text-center'>
                    <Image
                        src='/images/logo1.png'
                        alt='Logo'
                        width={500}
                        height={500}
                        color='white'
                        className='text-white inline-block'
                    />
                </h1>
                <form onSubmit={handleSubmit} className='mt-4'>
                    <div className='flex items-center border-b-2 border-primary py-2'>
                        <AiOutlineMail className='w-6 h-6 text-blue-600' />
                        <input
                            type='email'
                            placeholder='Email'
                            className='w-full pl-2 ml-2 bg-transparent border-none focus:outline-none'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center border-b-2 border-primary py-2 mt-4'>
                        <AiOutlineLock className='w-6 h-6 text-blue-600' />
                        <input
                            type='password'
                            placeholder='Password'
                            className='w-full pl-2 ml-2 bg-transparent border-none focus:outline-none'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center border-b-2 border-primary py-2 mt-4'>
                        <AiOutlineUser className='w-6 h-6 text-blue-600' />
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className='w-full pl-2 ml-2 bg-transparent border-none focus:outline-none'
                        >
                            <option value=''>Select Role</option>
                            <option value='user'>User</option>
                            <option value='tailor'>Tailor</option>
                            <option value="rider">Rider</option>
                        </select>
                    </div>
                    <button
                        type='submit'
                        className='bg-gray-800 text-white w-full py-2 mt-4 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out'
                    >
                        Login
                    </button>

                    {/* Already have an Account */}
                    <p className='mt-4 text-center'>
                        Don&apos;t have an account?{' '}
                        <Link
                            href={'/register'}
                            className='text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out
                                underline
                                '
                        >
                            Register

                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
