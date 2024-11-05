import React from 'react'
// import Img
import Img from "../../assets/img/common/error.png"
// import Link
import { Link } from 'react-router-dom'



const ErrorArea = () => {
  return (
    <>
         {/* <!--Error Areas --> */}
    <section id="error_main" className="section_padding">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 offset-lg-3 col-md-12 col-sm-12 col-12">
                    <div className="error_content text-center">
                        <img src={Img} alt="img" />
                        <h2>Error 404 : page not found</h2>
                        <Link to="/" className="btn btn_theme btn_md">Back to home</Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default ErrorArea