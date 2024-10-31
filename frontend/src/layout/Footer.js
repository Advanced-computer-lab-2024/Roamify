import React from 'react'
// Import Footer Data
import { FooterData } from './FooterData'
// Import Link
import { Link } from 'react-router-dom'

const Footer = () => {

  return (
    <>
        <footer id="footer_area">
        <div className="container">
            <div className="row">

                <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                    <div className="footer_heading_area">
                        <h5>Need any help?</h5>
                    </div>
                    <div className="footer_first_area">
                        <div className="footer_inquery_area">
                            <h5>Call 24/7 for any help</h5>
                            <h3> <a href="tel:+00-123-456-789">+00 123 456 789</a></h3>
                        </div>
                        <div className="footer_inquery_area">
                            <h5>Mail to our support team</h5>
                            <h3> <a href="mailto:support@domain.com">support@domain.com</a></h3>
                        </div>
                        <div className="footer_inquery_area">
                            <h5>Follow us on</h5>
                            <ul className="soical_icon_footer">
                                <li><a href="#!"><i className="fab fa-facebook"></i></a></li>
                                <li><a href="#!"><i className="fab fa-twitter-square"></i></a></li>
                                <li><a href="#!"><i className="fab fa-instagram"></i></a></li>
                                <li><a href="#!"><i className="fab fa-linkedin"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                    {FooterData.map((data, index)=>(
                         <div  className={data.offset === true ? ("col-lg-2  col-md-6 col-sm-6 col-12 offset-lg-1" ):("col-lg-2  col-md-6 col-sm-6 col-12" )} key={index}>
                         <div className="footer_heading_area">
                             <h5>{data.heading}</h5>
                         </div>
                         <div className="footer_link_area">
                             <ul>
                                {data.item.map((data1, index1) =>(
                                     <li key={index1}><Link to={data1.linkL}>{data1.FItem}</Link></li>
                                ))}
                                
                             </ul>
                         </div>
                     </div>
                    ))}
               

            
            </div>
        </div>
    </footer>
    </>
  )
}

export default Footer