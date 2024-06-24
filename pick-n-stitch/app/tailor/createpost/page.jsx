"use client";

import TailorNavbar from '@/app/components/TailorNavbar';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CreatePost() {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [tailorName, setTailorName] = useState('');
    const [email, setEmail] = useState('');

    
    useEffect(() => {
        const email = localStorage.getItem('email');
        setEmail(email);
        axios
            .get(`http://localhost:3001/api/tailor/tailors/${email}`)
            .then((res) => {
                setTailorName(res.data.username);
            }
            )

    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProductImage(file);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productDescription', productDescription);
        formData.append('productPrice', productPrice);
        formData.append('productImage', productImage);
        formData.append('tailorName', tailorName);

        try {
            const res = await axios.post('http://localhost:3001/api/trendy-designs/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Post created successfully');
            setProductName('');
            setProductDescription('');
            setProductPrice('');
            setProductImage(null);
        } catch (err) {
            console.log(err.response.data);
        }
    };
    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
            <TailorNavbar />
            <div className='max-w-2xl w-full space-y-8'>
                <div>
                    <h2 className='mt-6 text-center text-3xl font-extrabold text-blue-600'>
                        Create Trendy Post
                    </h2>
                </div>
                <h1>
                    <span className='text-blue-600'>Tailor Name:</span> {tailorName}
                </h1>
                <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
                    <input type='hidden' name='remember' value='true' />
                    <div className='flex flex-col gap-6 rounded-md shadow-sm -space-y-px'>
                        <div>
                            <label htmlFor='title' className='sr-only'>
                                Title
                            </label>
                            <input
                                id='title'
                                name='title'
                                type='text'
                                required
                                className='appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                                placeholder='Title'
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor='description' className='sr-only'>
                                Description
                            </label>
                            <textarea
                                id='description'
                                name='description'
                                required
                                className='appearance-none rounded-none relative block w-full px-3 py-12 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                placeholder='Description'
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor='price' className='sr-only'>
                                Price
                            </label>
                            <input
                                id='price'
                                name='price'
                                type='number'
                                required
                                className='appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                                placeholder='Product Price'
                                value={productPrice}
                                onChange={(e) => setProductPrice(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor='image' className='sr-only'>
                                Image
                            </label>
                            <input
                                id='productImage'
                                name='productImage'
                                type='file'
                                required
                                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='group relative w-fit flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
