// pages/nearby-tailors.js
import Navbar from '@/app/components/UserNavbar';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/app/components/MapComponent'),
    {
    ssr: false,
});

export default function NearbyTailors() {
    return (
        <>
            <Navbar />
            <MapComponent />
        </>
    );
}