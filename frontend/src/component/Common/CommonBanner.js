import React from 'react'
// import Link
import { Link } from 'react-router-dom'


const CommonBanner = (props) => {
  return (
    <>
        <section id="common_banner">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="common_bannner_text">
                        <h2>{props.heading}</h2>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><span><i className="fas fa-circle"></i></span> {props.pagination}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default CommonBanner