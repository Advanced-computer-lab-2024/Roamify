import React from 'react'
// import ReviewCard
import ReviewCard from '../Common/CustomerReview/ReviewCard'
// import ReviewData
import { ReviewData } from '../Common/CustomerReview/ReviewData'
// import SectionHeading
import SectionHeading from '../Common/SectionHeading'
// import Link
import { Link } from 'react-router-dom'


const TestimonialArea = () => {
  return (
    <>
        <section id="testimonials_main_arae" className="section_padding">
        <div className="container">
            <SectionHeading heading="What our client say about us" />
           
            <div className="row">
               {ReviewData.map((data, index)=> <ReviewCard img={data.img} para={data.review} date={data.date} name={data.name} des={data.des} status={data.status}  key={index}  />)}
                <div className="col-lg-12">
                    <div className="pagination_area">
                        <ul className="pagination">
                            <li className="page-item">
                                <Link className="page-link" to="/#" aria-label="Previous">
                                    <span className="sr-only">Previous</span>
                                </Link>
                            </li>
                            <li className="page-item"><Link className="page-link" to="/#!">1</Link></li>
                            <li className="page-item"><Link className="page-link" to="/#!">2</Link></li>
                            <li className="page-item"><Link className="page-link" to="/#!">3</Link></li>
                            <li className="page-item">
                                <Link className="page-link" to="/#!" aria-label="Next">
                                    <span className="sr-only">Next</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    </>
  )
}

export default TestimonialArea