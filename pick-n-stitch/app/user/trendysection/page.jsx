import React from 'react'
import { AiOutlinePicture, AiOutlineTag, AiOutlineInfoCircle, AiOutlineShoppingCart } from 'react-icons/ai';
import Image from 'next/image';
import Link from 'next/link';

const TrendyDesigns = () => {
    const designs = [
        {
            name: 'Elegant Embroidery',
            description: 'A beautiful design featuring intricate embroidery work. Perfect for formal events.',
            image: '/images/5.jpg',
        },
        {
            name: 'Classic Kurta',
            description: 'A classic kurta design that blends tradition with modern style. Ideal for any occasion.',
            image: '/images/3.jpg',
        },
        {
            name: 'Festive Anarkali',
            description: 'A festive Anarkali design with vibrant colors and detailed embellishments. Great for celebrations.',
            image: '/images/4.jpg',
        },
        {
            name: 'Stylish Sherwani',
            description: 'A stylish Sherwani design that combines elegance with sophistication. Perfect for weddings.',
            image: '/images/9.jpg',
        }
    ]

    return (
        <div className='w-full h-full flex flex-col items-center bg-gray-50
        md:py-8 
        '>
            <h1 className='mt-12 text-4xl font-bold text-blue-600'>
                Trendy Designs
            </h1>

            <hr
                className='w-1/2 mt-4 mb-8 border-2 border-blue-600'
            />

            <div className='flex flex-wrap justify-center mt-4'>
                {designs.map((design, index) => (
                    <div key={index} className='m-2 bg-white shadow-md rounded-lg overflow-hidden max-w-xs md:max-w-sm lg:max-w-md
                    '>
                        <div className='p-12 flex flex-col items-center'>
                            <div className='mb-4'>
                                <Image src={design.image} alt={design.name} width={200} height={200} 
                                className='rounded-lg'
                                />
                            </div>
                            <h2 className='font-bold text-2xl mb-2'><AiOutlineTag className='inline-block mr-2' />{design.name}</h2>
                            <p><AiOutlineInfoCircle className='inline-block mr-2' /><strong>Description:</strong> {design.description}</p>
                        </div>
                        <div className='text-center flex justify-center p-4 bg-gray-100 rounded-b-lg'>
                            <Link href={`/order/${design.name}`}>
                                <button className='text-sm font-semibold text-blue-700 hover:text-blue-900'>
                                    <AiOutlineShoppingCart className='inline-block mr-2' />Order Now
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Explore all */}
            <Link
                href='/user/trendy-designs'
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

export default TrendyDesigns
