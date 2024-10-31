import React from 'react'
// Import Link
import { Link } from 'react-router-dom'
// import Img
import Img from '../../../assets/img/common/abour_right.png'


const AboutArea = () => {
  return (
    <>
     <section id="about_us_top" className="section_padding">
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <div className="about_us_left">
                        <h5>About us</h5>
                        <h2>We Are The World Best Travel Agency Company Since 2000</h2>
                        <p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                            no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                            dolor sit amet, consetetur sadipscing elitr </p>
                        <p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                            no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                            dolor sit amet, consetetur sadipscing elitr </p>
                        <Link to="#!" className="btn btn_theme btn_md">Find tours</Link>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="about_us_right">
                        <img src={Img} alt="img" />
                    </div>
                </div>

            </div>
        </div>
    </section>

    </>
  )
}

export default AboutArea