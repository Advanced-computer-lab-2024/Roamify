import React from 'react'
// import FlightForm 
import TourGuideItineraryForm from "./TourGuideItineraryForm";
import TourGuideItineraryWrapper from "./TourGuideItineraryWrapper";
import CommonBanner from '../../component/Common/CommonBanner';
const TourGuideItinerary = () => {
  return (
    <>
     <CommonBanner
        heading="Itineraries"
        pagination="Itineraries"
      />
     <TourGuideItineraryForm/>
     {/* <TourGuideItineraryWrapper/> */}
    </>
  )
}

export default TourGuideItinerary;