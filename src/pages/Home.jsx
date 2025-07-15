// src/pages/Home.jsx
import React from 'react'
import HeroSlider from '../components/HeroSlider'
import CategoryFeatured from '../components/CategoryFeatured'
import OffersDay from '../components/OffersDay'

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <CategoryFeatured />
      <OffersDay />
    </div>
  )
}

export default Home
