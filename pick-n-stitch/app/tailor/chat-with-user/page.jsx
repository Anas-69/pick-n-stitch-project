"use client";

import TailorNavbar from '@/app/components/TailorNavbar';
import { useEffect, useState } from 'react';

import { CiDeliveryTruck } from "react-icons/ci";
import Link from 'next/link';
import { LuSend } from "react-icons/lu";
import io from 'socket.io-client';
import axios from 'axios';



export default function ChatPage({ searchParams }) {
    const userName = searchParams.user;
    const receiver = searchParams.receiver;
    const userMessage = searchParams.message;

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [notificationPermission, setNotificationPermission] = useState(true);
    const socket = io('http://localhost:3001');

    const fetchMessages = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/chat/messages/${userName}/${receiver}`);
            setMessages(res.data);
        }
        catch (err) {
            console.log(err.response.data);
        }
    }

    useEffect(() => {
        fetchMessages();
    }, [receiver, userName]);

    useEffect(() => {
        socket.on('new message', (data) => {
            console.log('Received message:', data);
            fetchMessages();
        });
        return () => {
            socket.off('new message');
        };
    }, [receiver, notificationPermission]);

    const sendMessage = () => {
        socket.emit('message', {
            sender: userName,
            receiver: receiver,
            message: newMessage
        });

        // all call the api to save the message in the database
        const saveMessage = async () => {
            await axios.post('http://localhost:3001/api/chat/create', {
                sender: receiver,
                receiver: userName,
                message: newMessage
            });
        }
        saveMessage();
        setNewMessage('');
        alert('Message sent');
    }


    return (
        <div
            className='flex flex-col'
        >
            <TailorNavbar />
            <Link
                href={{
                    pathname: '/tailor/postdelivery',
                    query: {
                        user: userName,
                    },
                }}
                className='absolute bottom-2 right-4 md:top-16 md:right-4 p-4 cursor-pointer'
            >
                <CiDeliveryTruck
                    className='text-4xl font-bold text-blue-500 cursor-pointers
                    '
                />
            </Link>
            <div className="mt-16 flex flex-col h-full px-4 md:px-32">
                <h1
                className='text-xl font-semibold text-center my-4'
                >
                    Sender : {receiver}
                </h1>
                <h1 className="text-xl font-semibold text-center my-4">
                    Start chatting with {userName}
                </h1>

                <div className="flex-grow overflow-auto">
                    {
                        messages.map((message, index) => (
                            <div
                                key={index}
                                className={`p-4 rounded-md my-1 w-full text-left ${message.sender === 'You'
                                        ? 'bg-blue-100 self-end'
                                        : 'bg-gray-100'
                                    }`}
                            >
                                <p className="text-sm font-bold">{message.sender}</p>
                                <p>{message.message}</p>
                            </div>
                        ))
                    }
                </div>
                <div className="flex items-center justify-between p-4 border-t my-20">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="w-full px-4 py-2 mr-2 rounded-md border focus:outline-none focus:border-blue-500"
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none"
                    >
                        <LuSend
                            className='text-2xl'
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
