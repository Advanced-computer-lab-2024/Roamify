import React from 'react'
// import Common Banner
import CommonBanner from '../component/Common/CommonBanner'
// import AboutArea
import AboutArea from '../component/About/AboutArea'
// import DiscountArea
import DiscountArea from '../component/About/DiscountArea'
// import AboutServices
import AboutServices from '../component/About/Services'
// import Consultation
import Consultation from '../component/About/Consultation'
// import Counter
import Counter from '../component/About/Counter'
// import CustomerReview
import CustomerReview from '../component/About/CustomerReview'



const About = () => {
  return (
    <>
    <CommonBanner heading="About us" pagination="About"/>
    <AboutArea/>
    <DiscountArea/>
    <AboutServices/>
    <Consultation/>
    <Counter/>
    <CustomerReview/>
    </>
  )
}

export default About