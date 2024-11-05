import React from 'react'
// import CommonBanner
import CommonBanner from '../component/Common/CommonBanner'
// import BecomeExpertArea
import BecomeExpertArea from '../component/BecomeExpert'

const BecomeExpert = () => {
  return (
    <>
        <CommonBanner heading="Become an expert" pagination="Become an expert"/>
        <BecomeExpertArea/>
    </>
  )
}

export default BecomeExpert