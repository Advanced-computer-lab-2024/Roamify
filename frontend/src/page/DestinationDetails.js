import React from 'react'
// import CommonBanner
import CommonBanner from '../component/Common/CommonBanner'
// import DestinationDetailsArea
import DestinationDetailsArea from '../component/DestinationDetails'

const DestinationDetails = () => {
  return (
    <>
        <CommonBanner heading="Destination details" pagination="Destination details"/>
        <DestinationDetailsArea/>
    </>
  )
}

export default DestinationDetails