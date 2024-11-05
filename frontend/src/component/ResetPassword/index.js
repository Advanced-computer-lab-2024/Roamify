import React from 'react'

const ResetPasswordArea = () => {
  return (
    <>
          <section id="common_author_area" className="section_padding">
        <div className="container">
            <div className="row">
                <div className="col-lg-8 offset-lg-2">
                    <div className="common_author_boxed">
                        <div className="common_author_heading">
                            <h3>Reset password</h3>
                            <h2>Reset you password</h2>
                        </div>
                        <div className="common_author_form">
                            <form action="#" id="main_author_form">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="New password" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Old password" />
                                </div>
                                <div className="common_form_submit">
                                    <button className="btn btn_theme btn_md">Reset password</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default ResetPasswordArea