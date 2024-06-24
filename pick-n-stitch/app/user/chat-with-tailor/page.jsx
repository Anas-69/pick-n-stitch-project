"use client";

import React, { Suspense, useEffect, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import Navbar from '@/app/components/UserNavbar';
import io from 'socket.io-client';
import axios from 'axios';

const ChatWithTailor = ({ searchParams }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [phone, setPhone] = useState('+923001234567');
    const [location, setLocation] = useState('Lahore');
    const [averagePrice, setAveragePrice] = useState('2000');
    const tailorName = searchParams.tailorName;

    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState(tailorName);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [notificationPermission, setNotificationPermission] = useState(true);
    const socket = io('http://localhost:3001');

    useEffect(() => {
        const email = localStorage.getItem('email');
        const fetchSender = async () => {
            const res = await axios.get(`http://localhost:3001/api/user/users/${email}`);
            setSender(res.data.username);
        }
        fetchSender();
        console.log('Sender: ', sender);
    }, [])

    const fetchMessages = async () => {
        try
        {
            const res = await axios.get(`http://localhost:3001/api/chat/messages/${sender}/${receiver}`);
            setMessages(res.data);
        }
        catch (err) {
            console.log(err.response.data);
        }
    }

    useEffect(() => {
        fetchMessages();
    }, [sender, receiver]);


    useEffect(() => {
        socket.on('new message', (data) => {
            console.log('Received message:', data);
            fetchMessages();
        });
        return () => {
            socket.off('new message');
        };
    }, [sender, notificationPermission]);


    const sendMessage = () => {
        socket.emit('message', {
            sender,
            receiver,
            message
        });

        // all call the api to save the message in the database
        const saveMessage = async () => {
            await axios.post('http://localhost:3001/api/chat/create', {
                sender,
                receiver,
                message
            });
        }
        saveMessage();
        setMessage('');
        alert('Message sent successfully');
        fetchMessages();
    }

    return (

        <div className='flex flex-col h-screen w-full bg-gray-100 overflow-y-auto'>
            <Navbar />
            <div className='mt-32 flex flex-col items-center'>
                <h1
                    className='text-md text-center text-blue-600 mb-2'
                >
                    Sender: {sender}
                </h1>

                <h1 className='text-lg text-center font-bold text-blue-600 mb-4'>
                    Chat with {tailorName}
                </h1>

                <div className='w-11/12 md:w-1/2 lg:w-1/3 h-4/5 bg-white mt-4 rounded-lg shadow-lg flex flex-col'>
                    <div className='overflow-y-auto p-4 my-12'>
                        {/* Sample messages */}
                        {messages.map((msg, index) => (
                            <div key={index} className='flex flex-col'>
                                <p className='text-sm font-semibold text-blue-600'>
                                    {msg.receiver === sender ? 'You' : msg.receiver}
                                </p>
                                <p className='text-sm'>
                                    {msg.message}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className='h-1/6 border-t border-gray-200 flex items-center justify-between p-4'>
                        <input type='text' className='w-10/12 h-3/4 rounded-lg p-4 border border-gray-300' placeholder='Type your message here...'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <FaPaperPlane className='text-2xl text-blue-600 cursor-pointer ml-4'
                        onClick={sendMessage}
                        />
                    </div>

                </div>
            </div>

            {/* View profile page */}
            <div className='fixed bottom-0 right-0 mr-4 mb-4'>
                <button
                    className='bg-blue-600 text-white px-4 py-2 rounded-lg
                    hover:bg-blue-700
                    '
                    onClick={() => setShowPopup(true)}
                >
                    View Profile
                </button>
            </div>

            {/* Popup */}
            {showPopup && (
                <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
                    <div className='w-11/12 md:w-1/2 lg:w-1/3 bg-white rounded-lg p-4'>
                        <div className='flex justify-between items-center'>
                            <h1 className='text-2xl font-bold text-blue-600'>
                                {tailorName}
                            </h1>
                            <button
                                className='text-2xl text-red-600'
                                onClick={() => setShowPopup(false)}
                            >
                                &times;
                            </button>
                        </div>
                        <div className='mt-4'>
                            <p>
                                Phone: {phone}
                            </p>
                            <p>
                                Location: {location}
                            </p>
                            <p>
                                Average Price: {averagePrice}
                            </p>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ChatWithTailor;