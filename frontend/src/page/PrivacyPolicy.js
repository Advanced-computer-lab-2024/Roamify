import React from 'react'
// import CommonBanner
import CommonBanner from '../component/Common/CommonBanner'
// import CommonBanner
import PrivacyPolicyArea from '../component/PrivacyPolicy'

const PrivacyPolicy = () => {
  return (
    <>
        <CommonBanner heading="Privacy Policy" pagination="Privacy Policy"/> 
        <PrivacyPolicyArea/>
    </>
  )
}

export default PrivacyPolicy