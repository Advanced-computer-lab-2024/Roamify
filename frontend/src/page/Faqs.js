import React from 'react'
// import CommonBanner
import CommonBanner from '../component/Common/CommonBanner'
// import AllFaqs
import AllFaqs from '../component/Faqs'


const FaqsArea = () => {
  return (
    <>
      <CommonBanner heading="Faqs" pagination="Faqs"/>
      <AllFaqs/>
    </>
  )
}

export default FaqsArea