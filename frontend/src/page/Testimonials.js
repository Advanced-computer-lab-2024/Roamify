import React from 'react'
// import CommonBanner
import CommonBanner from '../component/Common/CommonBanner'
// import TestimonialArea
import TestimonialArea from '../component/Testimonials'

const Testimonials = () => {
  return (
    <>
        <CommonBanner heading="Testimonials" pagination="Testimonials"/>
        <TestimonialArea/>
    </>
  )
}

export default Testimonials