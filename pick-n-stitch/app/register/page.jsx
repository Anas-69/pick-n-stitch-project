"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineMail, AiOutlineLock, AiOutlineUser, AiOutlinePhone, AiOutlineIdcard, AiOutlineNumber } from 'react-icons/ai';

import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [location, setLocation] = useState('');
    const [cnic, setCnic] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');

    const router = useRouter();

    // Gujrat
//     Kharian
// Sarai Alamgir
//     Lalamusa
// Jalalpur Jattan
//     Dinga
//     Kunjah
// Kharian Cantonment
// Jamalpur Syedan
    //     Bakhshupura
    
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

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Handle form submission

        if (role === 'user') {
            try {
                console.log(username, email, password, role, location, cnic);
                const res = await axios.post('http://localhost:3001/api/user/register', {
                    username,
                    email,
                    password,
                    role,
                    location,
                    cnic,
                });

                // If the request is successful and the user is found
                if (res.status === 200 && res.data) {
                    router.push('/');
                } else {
                    alert('Invalid Credentials');
                }

            } catch (error) {
                console.error('Error:', error.response.data);
            }

        }

        if (role === 'tailor') {
            try {
                console.log(username, email, password, role, location, cnic);
                const res = await axios.post('http://localhost:3001/api/tailor/register', {
                    username,
                    email,
                    password,
                    role,
                    location,
                    cnic,
                    phone : phoneNumber
                });

                // If the request is successful and the user is found
                if (res.status === 200 && res.data) {
                    router.push('/');
                } else {
                    alert('Invalid Credentials');
                }

            } catch (error) {
                console.error('Error:', error.response.data);
            }

        }

        if (role === 'rider') {
            try {
                const res = await axios.post('http://localhost:3001/api/rider/register', {
                    username,
                    email,
                    password,
                    role,
                    location,
                    cnic,
                    phone: phoneNumber,
                    license: licenseNumber
                });

                // If the request is successful and the user is found
                if (res.status === 200 && res.data) {
                    router.push('/');
                } else {
                    alert('Invalid Credentials');
                }

            } catch (error) {
                console.error('Error:', error.response.data);
            }
        }

    };

    return (
        <div className='w-full h-full py-8 flex flex-col items-center justify-center bg-gray-50'>
            <div className='w-96 bg-secondary p-8 rounded-lg shadow-lg shadow-gray-500'>
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
                    {/* username */}
                    <div className='flex items-center border-b-2 border-primary py-2'>
                        <AiOutlineUser className='w-6 h-6 text-blue-600' />
                        <input
                            type='text'
                            placeholder='Username'
                            className='w-full pl-2 ml-2 bg-transparent border-none focus:outline-none'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
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
                        <AiOutlineLock className='w-6 h-6 text-blue-600' />
                        <input
                            type='password'
                            placeholder='Confirm Password'
                            className='w-full pl-2 ml-2 bg-transparent border-none focus:outline-none'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                            <option value='rider'>Rider</option>
                        </select>
                    </div>
                    <div className='flex items-center border-b-2 border-primary py-2 mt-4'>
                        <AiOutlineIdcard className='w-6 h-6 text-blue-600' />
                        <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className='w-full pl-2 ml-2 bg-transparent border-none focus:outline-none'
                        >
                            <option value=''>Select Location</option>
                            {locationOptions.map((loc) => (
                                <option key={loc} value={loc}>
                                    {loc}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='flex items-center border-b-2 border-primary py-2 mt-4'>
                        <AiOutlineIdcard className='w-6 h-6 text-blue-600' />
                        <input
                            type='text'
                            placeholder='CNIC'
                            className='w-full pl-2 ml-2 bg-transparent border-none focus:outline-none'
                            value={cnic}
                            onChange={(e) => setCnic(e.target.value)}
                        />
                    </div>
                    {role === 'tailor' || role === 'rider' ? (
                        <div className='flex items-center border-b-2 border-primary py-2 mt-4'>
                            <AiOutlinePhone className='w-6 h-6 text-blue-600' />
                            <input
                                type='text'
                                placeholder='Phone Number'
                                className='w-full pl-2 ml-2 bg-transparent border-none focus:outline-none'
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                    ) : null}
                    {role === 'rider' ? (
                        <div className='flex items-center border-b-2 border-primary py-2 mt-4'>
                            <AiOutlineNumber className='w-6 h-6 text-blue-600' />
                            <input
                                type='text'
                                placeholder='License Number'
                                className='w-full pl-2 ml-2 bg-transparent border-none focus:outline-none'
                                value={licenseNumber}
                                onChange={(e) => setLicenseNumber(e.target.value)}
                            />
                        </div>
                    ) : null}
                    <button
                        type='submit'
                        className='bg-gray-800 text-white w-full py-2 mt-4 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out'
                    >
                        Register
                    </button>

                    {/* Already have an Account */}
                    <p className='mt-4 text-center'>
                        Already have an account?{' '}
                        <Link
                            href={'/login'}
                            className='text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out underline'
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
