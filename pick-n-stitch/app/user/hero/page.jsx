import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <div className='w-full h-screen flex flex-col md:flex-row gap-4
        px-4 md:px-32
        border-b-4 border-gray-200 overflow-hidden
        '>
            {/* Div for Content */}
            <div
                className='flex-1 flex flex-col justify-center'
            >
                <h1>
                    <span className='text-3xl md:text-5xl font-bold text-gray-600'>Welcome to </span> <br />
                    <span className='text-5xl md:text-7xl font-bold text-blue-600'>
                        PickNStitch
                    </span>
                </h1>
                <p className='text-sm md:text-lg text-gray-500 mt-4'>
                    The best place to find the best tailors and riders.
                </p>

                <div className='flex flex-col md:flex-row gap-4 mt-8'>
                    <Link href='/register'>
                        <button
                            className='bg-blue-600 text-white px-4 py-2 rounded-lg
                        hover:bg-blue-700
                        '
                        >
                            Join Us
                        </button>
                    </Link>

                    <Link href='/user/nearby-tailors'>
                        <button
                            className='bg-gray-200 text-blue-600 px-4 py-2 rounded-lg
                            hover:bg-gray-300
                            '
                        >
                            Explore Now
                        </button>
                    </Link>
                </div>

            </div>


            {/* Div for Image*/}
            <div
                className='hidden md:flex flex-1 justify-center items-center'
            >
                <Image
                    src='/images/hero.png'
                    alt='Hero Image'
                    width={450}
                    height={450}
                    className='mt-32'
                />
            </div>
        </div>
    );
}
