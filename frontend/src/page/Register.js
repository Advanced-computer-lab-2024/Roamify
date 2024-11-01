import React from 'react'
// import CommonBanner
import CommonBanner from '../component/Common/CommonBanner'
// Import RegisterArea
import RegisterArea from '../component/Register'


const Register = () => {
  return (
    <>
        <CommonBanner heading="Register" pagination="Register"/>
        <RegisterArea/>
    </>
  )
}

export default Register