import React from 'react'
// import CommonBanner
import CommonBanner from '../component/Common/CommonBanner'
// import LoginArea
import LoginArea from '../component/Login'


const Login = () => {
  return (
    <>
    <CommonBanner heading="Login" pagination="Login"/>
    <LoginArea/>
 
    </>
  )
}

export default Login