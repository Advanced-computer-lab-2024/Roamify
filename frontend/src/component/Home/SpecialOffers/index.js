import React from 'react'
// import Link
import { Link } from 'react-router-dom'
// import img
import img1 from '../../../assets/img/offer/offer1.png'
import img2 from '../../../assets/img/offer/offer2.png'
import img3 from '../../../assets/img/offer/offer3.png'

const SpecialOffer = () => {
  return (
    <>
       <section id="offer_area" className="section_padding_top">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="offer_area_box d-none-phone img_animation">
                        <img src={img1} alt="img" />
                        <div className="offer_area_content">
                            <h2>Special Offers</h2>
                            <p>Invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
                                accusam et justo duo dolores et ea rebum. Stet clita kasd dolor sit amet. Lorem ipsum
                                dolor sit amet.</p>
                            <Link to="#!" className="btn btn_theme btn_md">Holiday deals</Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                    <div className="offer_area_box img_animation">
                        <img src={img2} alt="img" />
                        <div className="offer_area_content">
                            <h2>News letter</h2>
                            <p>Invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et.</p>
                            <Link to="#!" className="btn btn_theme btn_md">Subscribe now</Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                    <div className="offer_area_box img_animation">
                        <img src={img3} alt="img" />
                        <div className="offer_area_content">
                            <h2>Travel tips</h2>
                            <p>Invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et.</p>
                            <Link to="#!" className="btn btn_theme btn_md">Get tips</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default SpecialOffer