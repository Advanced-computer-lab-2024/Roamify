import React from 'react'
// import HowItWorks
import HowItWorks from './HowItWorks'
// import VideoAreaTwo
import VideoAreaTwo from './VideoAreaTwo'
// import AboutServices
import AboutServices from '../About/Services'
// import AboutServices
import VendorArea from './Vendor'

const BecomeExpertArea = () => {
  return (
    <>
            {/* <!-- How It Work --> */}
            <HowItWorks/>

            {/* <!-- Video Area --> */}
            <VideoAreaTwo/>

            {/* <!-- AboutServices--> */}
            <AboutServices padding={true}/>

            {/* <!-- Vendor Form Area --> */}
            <VendorArea/>
    
    </>
  )
}

export default BecomeExpertArea