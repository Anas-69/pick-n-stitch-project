"use client";
import TailorNavbar from '@/app/components/TailorNavbar';
import Link from 'next/link';
import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

const TailorChatWithUsers = () => {
    const [messages, setMessages] = useState([]);
    const [receiver, setReceiver] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const email = localStorage.getItem('email');
                console.log('Email: ', email);

                const res = await axios.get(`http://localhost:3001/api/tailor/tailors/${email}`);
                setReceiver(res.data.username);
                console.log('Receiver: ', receiver);

                const messagesRes = await axios.get(`http://localhost:3001/api/chat/messages/${res.data.username}`);
                setMessages(messagesRes.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='flex flex-col w-full h-screen bg-gray-100'>
            <TailorNavbar />
            {/* Div to display the messages */}
            <h1 className='text-md text-center mt-24'>
                {receiver ? `Messages for ${receiver}` : 'Messages'}
            </h1>
            <div className='flex flex-col justify-center items-center mt-4'>
                {messages.length > 0 ? (
                    messages.map((message, index) => (
                        <div
                            key={index}
                            className='relative p-4 bg-blue-100 rounded-md my-1 w-full md:w-1/2 text-left flex flex-col items-center justify-center md:flex-row md:items-center md:justify-between '
                        >
                            <div className='flex justify-center items-center gap-4'>
                                <p className="text-sm font-bold">{message.sender}</p>
                                <p>{message.message}</p>
                            </div>
                            <Link
                                className='bg-blue-500 text-white px-4 py-2 rounded-md mt-2 '
                                href={{
                                    pathname: '/tailor/chat-with-user',
                                    query: {
                                        user: message.sender,
                                        receiver : message.receiver,
                                        message: message.message
                                    },
                                }}
                            >
                                Reply
                            </Link>
                        </div>
                    ))
                ) : (
                    <h1 className='text-md text-center'>No Messages</h1>
                )}
            </div>
        </div>
    );
};

export default TailorChatWithUsers;