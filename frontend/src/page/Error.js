import React from 'react'
// import CommonBanner
import CommonBanner from '../component/Common/CommonBanner'
// import ErrorArea
import ErrorArea from '../component/Error'

const Error = () => {
  return (
    <>  
        <CommonBanner heading="Error" pagination="Error"/>
        <ErrorArea/>
    </>
  )
}

export default Error