import React from 'react'
// Import Secting Heading
import SectionHeading from '../../Common/SectionHeading'
import { ReviewData } from '../../Common/CustomerReview/ReviewData'
import ReviewCard from '../../Common/CustomerReview/ReviewCard'


const CustomerReview = () => {
  return (
    <>
        <section id="customer_reviews" className="section_padding_bottom">
        <div className="container">
            <SectionHeading heading="Customer review"/>
            <div className="row">
                {ReviewData.slice(1,4).map((data, index)=> <ReviewCard img={data.img} para={data.review} date={data.date} name={data.name} des={data.des} status={data.status}  key={index}  /> )}
            </div>
        </div>
    </section>
    </>
  )
}

export default CustomerReview