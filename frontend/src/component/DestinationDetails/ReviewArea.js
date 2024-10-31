import React from 'react'
// Import ReviewCard
import ReviewCard from '../Common/CustomerReview/ReviewCard'
// Import ReviewData
import { ReviewData } from '../Common/CustomerReview/ReviewData'

const ReviewArea = () => {
  return (
    <>
         <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="write_your_review_wrapper">
                <h3 className="heading_theme">Write your review</h3>
                <div className="write_review_inner_boxed">
                  <form action="!#" id="news_comment_form">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-froup">
                          <input
                            type="text"
                            className="form-control bg_input"
                            placeholder="Enter full name"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-froup">
                          <input
                            type="text"
                            className="form-control bg_input"
                            placeholder="Enter email address"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-froup">
                          <textarea
                            rows="6"
                            placeholder="Write your comments"
                            className="form-control bg_input"
                          ></textarea>
                        </div>
                        <div className="comment_form_submit">
                          <button className="btn btn_theme btn_md">
                            Post comment
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="all_review_wrapper">
                <h3 className="heading_theme">All review</h3>
              </div>
            </div>
            {ReviewData.slice(0, 3).map((data, index) =>(
               <ReviewCard img={data.img} para={data.review}  key={index} />
            ))}
          </div>
        </div>
    </>
  )
}

export default ReviewArea