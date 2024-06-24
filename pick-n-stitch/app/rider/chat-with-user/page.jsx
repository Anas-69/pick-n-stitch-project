"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import RiderNavbar from "@/app/components/RiderNavbar";
import { LuSend } from "react-icons/lu";
import io from 'socket.io-client';


const ChatWithUser = () => {
  const [riderName, setRiderName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerNames, setCustomerNames] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [notificationPermission, setNotificationPermission] = useState(true);
  const socket = io('http://localhost:3001');


  const fetchMessages = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/chat/messages/${riderName}/${customerName}`);
      setMessages(res.data);
    }
    catch (err) {
      console.log(err.response.data);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, [customerName, riderName]);


  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem('email');
      const res = await axios.get(`http://localhost:3001/api/rider/riders/${email}`);
      setRiderName(res.data.username);
      const res2 = await axios.get(`http://localhost:3001/api/order/orders/${res.data.username}`);
      setCustomerNames(res2.data);
      console.log(res2.data);
    }

    fetchData();
  }, [localStorage.getItem('email')]);

  console.log(customerNames);


  const sendMessage = () => {
    socket.emit('message', {
      sender: riderName,
      receiver: customerName,
      message: newMessage
    });

    // all call the api to save the message in the database
    const saveMessage = async () => {
      await axios.post('http://localhost:3001/api/chat/create', {
        sender: riderName,
        receiver: customerName,
        message: newMessage
      });
    }
    saveMessage();
    fetchMessages();
    setNewMessage('');
    alert('Message sent');
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col w-full h-full mt-32">
        <RiderNavbar />
        <div className="flex flex-col w-full h-full items-center">
          <h1>Rider Name: {riderName}</h1>
          <div>
            <select
              className="border-2 border-gray-400 rounded-md"
              onChange={(e) => setCustomerName(e.target.value)}
              value={customerName}
            >
              <option value="">Select the Customer</option>
              {customerNames.map((customer, index) => (
                <option key={index}>{customer}</option>
              ))}
            </select>
          </div>

          <div className="flex-grow overflow-y-auto 
          bg-gray-200 rounded-md max-w-xl w-full h-96 p-4 my-4
          ">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-4 rounded-md my-1 max-w-xl w-full text-left 
                ${message.sender === riderName ? 'bg-blue-100 self-end' : 'bg-gray-100'}`}
              >
                {/* Display sender name and message */}
                <p className="text-sm font-bold">{message.sender}</p>
                <p>{message.message}</p>
              </div>
            ))}
          </div>

          {/* Input field and send button */}
          <div className="flex items-center justify-between p-4 border-t my-4">
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
              <LuSend className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatWithUser;