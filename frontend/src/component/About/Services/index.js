import React from 'react'
// import link
import { Link } from 'react-router-dom'
// import Data
import { ServiceData } from './Data'




const AboutServices = (props) => {
  return (
    <>
    <section id="about_service_offer" className={props.padding === true ? ("section_padding") : ( "section_padding_bottom")}>
        <div className="container">
            <div className="row">
                {ServiceData.map((data, index) =>(
                    <div className="col-lg-3 col-md-6 col-sm-12 col-12" key={index}>
                    <div className="about_service_boxed">
                        <img src={data.img} alt="img" />
                        <h5><Link to="#!">{data.heading}</Link></h5>
                        <p>{data.para}</p>
                    </div>
                </div>
                ))}
                
            </div>
        </div>
    </section>

    </>
  )
}

export default AboutServices