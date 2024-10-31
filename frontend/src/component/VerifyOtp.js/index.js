import React from 'react'

const VerifyOTPArea = () => {
  return (
    <>
            <section id="common_author_area" className="section_padding">
        <div className="container">
            <div className="row">
                <div className="col-lg-8 offset-lg-2">
                    <div className="common_author_boxed">
                        <div className="common_author_heading">
                            <h3>Verify OTP</h3>
                            <h2>Verify your OTP</h2>
                        </div>
                        <div className="common_author_form">
                            <form action="#" id="main_author_form">
                                <div className="form-group">
                                    <div className="otpCont flex spaceBetween">
                                        <input className="otSc form-control" type="text" maxLength="1" />
                                        <input className="otSc form-control" type="text" maxLength="1" />
                                        <input className="otSc form-control" type="text" maxLength="1" />
                                        <input className="otSc form-control" type="text" maxLength="1" />
                                        <input className="otSc form-control" type="text" maxLength="1" />
                                    </div>
                                </div>
                                <div className="common_form_submit">
                                    <button className="btn btn_theme btn_md">Verify OTP</button>
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

export default VerifyOTPArea