import React from 'react'
// import  CommonBanner
import CommonBanner from '../component/Common/CommonBanner'
// import  CommonBanner
import ForgotPasswordArea from '../component/ForgotPassword'


const ForgetPassword = () => {
  return (
    <>
     <CommonBanner heading="Forgot password" pagination="Forgot password"/>
     <ForgotPasswordArea/>
    </>
  )
}

export default ForgetPassword