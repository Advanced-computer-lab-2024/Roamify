import React from 'react'
// import commonBanner
import CommonBanner from '../component/Common/CommonBanner'
// import ContactArea
import ContactArea from '../component/Contact'
const Contact = () => {
  return (
    <>
     <CommonBanner heading="Contact" pagination="Contact"/>
     <ContactArea/>
    </>
  )
}

export default Contact