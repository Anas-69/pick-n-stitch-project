import Image from "next/image";

export default function Footer() {
    return (
        <footer className='bg-gradient-to-r from-blue-400 to-teal-200
         shadow-lg sticky top-0 z-50
         '>
            <hr
            className="border-t-2 border-gray-300 mx-auto"
            />
            <div className='container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col'>
                <h1
                className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
                >
                <Image 
                    src='/images/hanger.svg'
                    alt='Logo'
                    width={50}
                    height={50}
                    className='h-8 w-auto'
                    />
                    <span className='ml-1 text-xl'>ickNStitch</span>
                    </h1>
                <p className='text-sm text-blue-300 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-blue-200 sm:py-2 sm:mt-0 mt-4'>© 2024 PickNStitch —
                    <a href='https://twitter.com/knyttneve' className='text-blue-500 ml-1' rel='noopener noreferrer' target='_blank'>@picknstitch</a>
                </p>
                <span className='inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start'>
                    <a className='text-blue-300'>
                        <svg fill='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' className='w-5 h-5' viewBox='0 0 24 24'>
                            <path d='M18 2h-3a5 5 0 00-5 5v14a2 2 0 002 2h6a2 2 0 002-2V7a5 5 0 00-2-5z'></path>
                            <path d='M15 3v4a3 3 0 003 3h4'></path>
                        </svg>
                    </a>
                    <a className='ml-3 text-blue-300'>
                        <svg fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' className='w-5 h-5' viewBox='0 0 24 24'>
                            <rect width='20' height='20' x='2' y='2' rx='5' ry='5'></rect>
                            <path d='M16 11h2m-6 0h2m-6 0h2'></path>
                        </svg>
                    </a>
                    <a className='ml-3 text-blue-300'>
                        <svg fill='currentColor' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='0' className='w-5 h-5' viewBox='0 0 24 24'>
                            <path stroke='none' d='M0 0h24v24H0z'></path>
                            <rect x='7' y='4' width='10' height='16' rx='1'></rect>
                            <path d='M11 5h2M12 17v.01'></path>
                        </svg>
                    </a>
                </span>
            </div>
        </footer>
    );
}
