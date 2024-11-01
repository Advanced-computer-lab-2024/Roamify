import React from 'react'
import Banner from '../component/Home/Banner'
import SearchForm from '../component/Home/SearchForm'
import Discover from '../component/Home/Discover'
import TopDestinations from '../component/Home/TopDestinations'
import ExploreArea from '../component/Home/Explore'
import SpecialOffer from '../component/Home/SpecialOffers'
import PromotionalTours from '../component/Home/PromotionalTours'
import DestinationsArea from '../component/Home/Destinations'
import BlogMain from '../component/Home/LatestNews'
const Home = () => {
  return (
    <>
    <Banner/>
    <SearchForm/>
    <Discover/>
    <TopDestinations/>
    <ExploreArea/>
    <SpecialOffer/>
    <PromotionalTours/>
    <DestinationsArea/>
    <BlogMain/>
    </>
  )
}

export default Home