"use client";

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
// import Navbar from '@/app/components/UserNavbar';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';


const tailorIcon = new Icon({
    iconUrl: "/images/Tailor.png",
    iconSize: [35, 30],
});

const NearByTailors = () => {
    const [tailorsDetails, setTailorsDetails] = useState([]);

    useEffect(() => {
        const fetchTailors = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/tailor/tailors');
                const modifiedTailorsData = res.data.map((tailor) => {
                    // 1. Gujrat: [32.5841, 74.0848]
                    // 2. Kharian: [32.8134, 73.8880]
                    // 3. Sarai Alamgir: [32.9046, 73.7590]
                    // 4. Lalamusa: [32.7046, 73.9575]
                    // 5. Jalalpur Jattan: [32.6453, 74.2117]
                    // 6. Dinga: [32.6387, 73.7223]
                    // 7. Kunjah: [32.5317, 73.9718]
                    // 8. Kharian Cantonment: [32.8143, 73.8934]
                    // 9. Jamalpur Syedan: [32.6048, 74.0958]
                    // 10. Bakhshupura: [32.5676, 74.0765]

                    if (tailor.location === 'Gujrat') {
                        return {
                            ...tailor,
                            location: [32.5841, 74.0848],
                        };
                    }

                    if (tailor.location === 'Kharian') {
                        return {
                            ...tailor,
                            location: [32.8134, 73.8880],
                        };
                    }

                    if (tailor.location === 'Sarai Alamgir') {
                        return {
                            ...tailor,
                            location: [32.9046, 73.7590],
                        };
                    }

                    if (tailor.location === 'Lalamusa') {
                        return {
                            ...tailor,
                            location: [32.7046, 73.9575],
                        };
                    }

                    if (tailor.location === 'Jalalpur Jattan') {
                        return {
                            ...tailor,
                            location: [32.6453, 74.2117],
                        };
                    }

                    if (tailor.location === 'Dinga') {
                        return {
                            ...tailor,
                            location: [32.6387, 73.7223],
                        };
                    }

                    if (tailor.location === 'Kunjah') {
                        return {
                            ...tailor,
                            location: [32.5317, 73.9718],
                        };
                    }

                    if (tailor.location === 'Kharian Cantonment') {
                        return {
                            ...tailor,
                            location: [32.8143, 73.8934],
                        };
                    }

                    if (tailor.location === 'Jamalpur Syedan') {
                        return {
                            ...tailor,
                            location: [32.6048, 74.0958],
                        };
                    }

                    if (tailor.location === 'Bakhshupura') {
                        return {
                            ...tailor,
                            location: [32.5676, 74.0765],
                        };
                    }

                    return tailor;
                });
                setTailorsDetails(modifiedTailorsData);
            } catch (err) {
                console.log(err.response.data);
            }
        };
        fetchTailors();
    }, []);


    return (
        <div>
            <div className='w-full h-screen flex justify-center items-center'>
                {
                    tailorsDetails.length > 0 && (
                        <MapContainer
                            center={[32.8134, 73.8880]}
                            zoom={9}
                            style={{ height: '80%', width: '80%' }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {
                                tailorsDetails.map((tailor, index) => (
                                    <Marker
                                        key={index}
                                        position={tailor.location}
                                        icon={tailorIcon}
                                    >
                                        <Popup>
                                            <div>
                                                <p className='text-sm font-bold'>Tailor Name</p>
                                                <p className='text-sm'>{tailor.username}</p>
                                                <p className='text-sm font-bold'>Tailor Phone</p>
                                                <p className='text-sm'>{tailor.phone}</p>
                                                <Link
                                                    href={`/user/chat-with-tailor?tailorName=${tailor.username}`}
                                                    className='bg-blue-500 text-gray-100 px-4 py-2 rounded-md'>Chat
                                                </Link>
                                            </div>
                                        </Popup>
                                    </Marker>
                                ))
                            }
                        </MapContainer>
                    )
                }
            </div>
        </div>
    );
};

export default NearByTailors;
