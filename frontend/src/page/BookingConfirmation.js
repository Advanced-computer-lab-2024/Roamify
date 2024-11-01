import React from 'react'
// import ComonBanner
import CommonBanner from '../component/Common/CommonBanner'
// import BookingConfirmationArea
import BookingConfirmationArea from '../component/BookingConfirmation'



const BookingConfirmation = () => {
  return (
    <>
        <CommonBanner heading="Booking Confirmation" pagination="Booking Confirmation"/>
        <BookingConfirmationArea/>
    </>
  )
}

export default BookingConfirmation