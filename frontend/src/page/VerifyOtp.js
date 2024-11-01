import React from 'react'
// import CommonBanner
import CommonBanner from '../component/Common/CommonBanner'
// import VerifyOTPArea
import VerifyOTPArea from '../component/VerifyOtp.js'


const VerifyOtp = () => {
  return (
    <>
    <CommonBanner heading="Verify OTP" pagination="Verify OTP"/>
    <VerifyOTPArea/>
    </>
  )
}

export default VerifyOtp