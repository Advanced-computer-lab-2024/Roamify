import React from 'react'
// import Common Banner
import CommonBanner from '../component/Common/CommonBanner'
// import TourGuids 
import TourGuidesArea from '../component/TourGuides'

const TourGuides = () => {
  return (
    <>
     <CommonBanner heading="Tour guides" pagination="Tour guides"/>
     <TourGuidesArea/>
    </>
  )
}

export default TourGuides