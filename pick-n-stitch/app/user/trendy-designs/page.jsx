"use client";

import React, { useState, useEffect } from 'react';
import { AiOutlinePicture, AiOutlineTag, AiOutlineInfoCircle, AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/app/components/UserNavbar';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
// import price icon from react-icons
import { AiOutlineDollar } from 'react-icons/ai';

const TrendyDesigns = () => {
    const [likes, setLikes] = useState(Array(9).fill(false));
    const [trendyDesigns, setTrendyDesigns] = useState([]);
    
    const designs = [
        { name: 'Elegant Embroidery', description: 'A beautiful design featuring intricate embroidery work. Perfect for formal events.', image: '/images/5.jpg', tailor: 'Ahmad Shah' },
        { name: 'Classic Kurta', description: 'A classic kurta design that blends tradition with modern style. Ideal for any occasion.', image: '/images/3.jpg', tailor: 'Zaid Shabbir ' },
        { name: 'Festive Anarkali', description: 'A festive Anarkali design with vibrant colors and detailed embellishments. Great for celebrations.', image: '/images/4.jpg', tailor: 'Classy Stitches' },
        { name: 'Stylish Sherwani', description: 'A stylish Sherwani design that combines elegance with sophistication. Perfect for weddings.', image: '/images/9.jpg', tailor: 'Sherwani House' },
        { name: 'Modern Salwar Kameez', description: 'A modern take on the traditional Salwar Kameez. Ideal for everyday wear.', image: '/images/6.jpg', tailor: 'Modern Tailors' },
        { name: 'Traditional Lehenga', description: 'A traditional Lehenga design with beautiful embroidery. Perfect for weddings and special occasions.', image: '/images/7.jpg', tailor: 'Traditional Creations' },
        { name: 'Casual Kurti', description: 'A casual Kurti design that offers both comfort and style. Ideal for everyday wear.', image: '/images/8.jpg', tailor: 'Casual Couture' },
        { name: 'Formal Sari', description: 'A formal Sari design with detailed embellishments. Perfect for formal events and special occasions.', image: '/images/10.jpg', tailor: 'Formal Fashions' },
        { name: 'Designer Ghagra Choli', description: 'A designer Ghagra Choli with intricate details. Ideal for weddings and celebrations.', image: '/images/11.jpg', tailor: 'Designer Stitches' },
        { name: 'Trendy Palazzo Suit', description: 'A trendy Palazzo Suit that combines tradition with modern style. Perfect for any occasion.', image: '/images/12.jpg', tailor: 'Trendy Tailors' },
    ]

    const handleLike = (index) => {
        setLikes(likes.map((like, i) => i === index ? !like : like)); // Toggle like for the clicked post
    }

    // Function to fetch more designs
    const fetchMoreData = () => {
        // Fetch more designs and update your state here
        // ...
    }

    useEffect(() => {
        axios
            .get('http://localhost:3001/api/trendy-designs')
            .then((res) => {
                setTrendyDesigns(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    , []);

    return (
        <div
        className='flex flex-col items-center justify-center w-full h-full bg-gray-50'
        >
            <Navbar />
            <div className='w-full h-full flex flex-col items-center bg-gray-50 md:py-8'>
                <h1 className='mt-12 text-4xl font-bold text-blue-600'>
                    Trendy Designs
                </h1>

                <hr className='w-1/2 mt-4 mb-8 border-2 border-blue-600' />

                <InfiniteScroll
                    dataLength={designs.length}
                    next={fetchMoreData}
                    hasMore={true} // Change this to false when there are no more designs to load
                    loader={<h4>Loading...</h4>}
                    className='flex flex-col items-center'
                >
                    {trendyDesigns.map((design, index) => (
                        <div key={index} className='m-2 bg-white shadow-md rounded-lg overflow-hidden max-w-xs md:max-w-sm lg:max-w-xl w-full'>
                            <div className='p-4 flex flex-col items-center'>
                                <div className='mb-4'>
                                    <Image src={design.productImage} alt={design.productName} width={200} height={200} className='rounded-lg' />
                                </div>
                                <h2 className='font-bold text-2xl mb-2'><AiOutlineTag className='inline-block mr-2' />{design.productName}</h2>
                                <p><AiOutlineInfoCircle className='inline-block mr-2' /><strong>Description:</strong> {design.productDescription}</p>
                                <p className='mt-2'><AiOutlinePicture className='inline-block mr-2' /><strong>Designed by:</strong> {design.tailorName}</p>
                                {/* get price also */}
                                <p className='mt-2'><AiOutlineDollar className='inline-block mr-2' /><strong>Price:</strong> {design.productPrice}</p>
                            </div>
                            <div className='text-center flex justify-center p-4 bg-gray-100 rounded-b-lg'>
                                <Link href={
                                    {
                                        pathname: '/user/order',
                                        query: { productImage: design.productImage, productName: design.productName, productDescription: design.productDescription, tailorName: design.tailorName, productPrice: design.productPrice
                                        }
                                    }
                                }>
                                    <button className='text-sm font-semibold text-blue-700 hover:text-blue-900'>
                                        <AiOutlineShoppingCart className='inline-block mr-2' />Order Now
                                    </button>
                                </Link>
                                <button
                                    onClick={() => handleLike(index)}
                                    className='text-sm font-semibold text-red-600 hover:text-red-800 ml-4'
                                >
                                    <AiOutlineHeart className='inline-block mr-2' />
                                    {likes[index] ? 'Unlike' : 'Like'}
                                </button>
                            </div>
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default TrendyDesigns;
