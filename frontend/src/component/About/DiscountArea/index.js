import React from 'react'
// Import Link
import { Link } from 'react-router-dom'
// import Img
import Img from '../../../assets/img/common/small_banner.png'
import Img1 from '../../../assets/img/common/big_banner.png'


const DiscountArea = () => {
  return (
    <>
     <section id="about_offer_banner" className="section_padding_bottom">
        <div className="container-fluid">
            <div className="row">
                <h2 className="d-none">Heading</h2>
                <div className="col-lg-4">
                    <div className="about_offer_banner">
                        <Link to="!#"><img src={Img} alt="img"/></Link>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="about_offer_banner">
                        <img src={Img1} alt="img" />
                        <div className="about_offer_text">
                            <h3>Enjoy <span>20%</span> discount</h3>
                            <h2>Thailand couple tour</h2>
                            <Link to="#!">Find tours</Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
    </>
  )
}

export default DiscountArea