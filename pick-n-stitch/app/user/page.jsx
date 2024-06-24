import React from 'react'
import Navbar from '../components/UserNavbar'
import HeroSection from './hero/page'
import Tailors from './tailorsection/page'
import TrendyDesigns from './trendysection/page'

const UserHomeScreen = () => {
  return (
    <div
    className='w-full h-full flex flex-col '
    >
      <Navbar />
      <HeroSection />
      <Tailors />
      <TrendyDesigns />
      {/* <Footer /> */}
    </div>
  )
}

export default UserHomeScreen