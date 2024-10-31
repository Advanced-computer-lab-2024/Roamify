import React from "react";

const CommentForm = () => {
  return (
    <>
      <div className="comment_area_form">
        <h3>Leave a comment</h3>
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
                <button className="btn btn_theme btn_md">Post comment</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CommentForm;
