import React from 'react'
// import CommonBanner
import CommonBanner from '../component/Common/CommonBanner'
// import ResetPasswordArea
import ResetPasswordArea from '../component/ResetPassword'

const ResetPassword = () => {

  return (
    <>
      <CommonBanner heading="Reset password" pagination="Reset password"/>
      <ResetPasswordArea/>
    </>
  )
}

export default ResetPassword