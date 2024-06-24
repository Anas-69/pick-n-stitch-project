"use client";

import TailorNavbar from "@/app/components/TailorNavbar";
import { useState, useEffect } from 'react';
import { LuSend } from "react-icons/lu";
import io from 'socket.io-client';
import axios from 'axios';


const ChatWithRaider = () => {
    const [username, setUsername] = useState('');
    const [rider, setRider] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [riderDetails, setRiderDetails] = useState([]);
    const socket = io('http://localhost:3001');

    useEffect(() => {
        const email = localStorage.getItem('email');
        axios.get(`http://localhost:3001/api/tailor/tailors/${email}`)
            .then((response) => {
                setUsername(response.data.username);
                console.log('User:', response.data.username);
            })
            .catch((error) => {
                console.error('Error fetching user details:', error);
            });
    }
    , []);

    useEffect(() => {
        const fetchRiders = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/rider/riders');
                const data = await response.json();
                setRiderDetails(data);
                console.log('Riders:', data);
            } catch (error) {
                console.error("Error fetching rider details:", error);
            }
        };

        fetchRiders();
    }, []);

    const sendMessage = () => {
        socket.emit('message', {
            sender: username,
            receiver: rider,
            message: newMessage
        });

        // all call the api to save the message in the database
        const saveMessage = async () => {
            await axios.post('http://localhost:3001/api/chat/create', {
                sender: username,
                receiver: rider,
                message: newMessage
            });
        }
        saveMessage();
        setNewMessage('');
        alert('Message sent');
    }


    return (
        <div className="flex flex-col w-full h-screen bg-gray-100">
            <TailorNavbar />
            <div className="flex flex-col justify-center items-center mt-20">
                {/* select for rider */}
                <select
                    value={rider}
                    onChange={(e) => setRider(e.target.value)}
                    className="px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                >
                    <option value="">Select Rider</option>
                    {riderDetails.map((rider, index) => (
                        <option key={index} value={rider.riderName}>
                            {rider.username} - {rider.location}
                        </option>
                    ))}
                </select>

                <h1 className="text-2xl font-semibold text-center my-4 text-blue-600">
                    Chat with {rider ? rider : 'Rider'}
                </h1>

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
                        <LuSend className='text-2xl' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatWithRaider;