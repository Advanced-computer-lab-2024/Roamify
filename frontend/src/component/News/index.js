import React from 'react'
// import Link
import { Link } from 'react-router-dom'
// import SectionHeading
import SectionHeading from '../Common/SectionHeading'
// import BigNews
import BigNews from './BigNews'
// import News Data
import { NewsData } from './Data'


const NewsArea = () => {
  return (
    <>
        <section id="news_main_arae" className="section_padding">
        <div className="container">
          <SectionHeading heading="Latest travel news"/>
            <BigNews/>

            <div className="new_main_news_box">
                <div className="row">
                    {NewsData.map((data, index)=>(
                          <div className="col-lg-4 col-md-6 col-sm-12 col-12" key={index}>
                          <div className="news_item_boxed">
                              <div className="news_item_img">
                                  <Link to="/news-details"><img src={data.img} alt="img" /></Link>
                              </div>
                              <div className="news_item_content">
                                  <h3><Link to="/news-details">{data.heading}</Link></h3>
                                  <p>{data.para}</p>
                              </div>
                              <div className="news_author_area">
                                  <div className="news_author_img">
                                      <img src={data.auth} alt="img" />
                                  </div>
                                  <div className="news_author_area_name">
                                      <h4>{data.name}</h4>
                                      <p><Link to="/news">{data.date}</Link> <i className="fas fa-circle"></i>{data.readTime}</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                    ))}
                  
                    <div className="col-lg-12">
                        <div className="pagination_area">
                            <ul className="pagination">
                                <li className="page-item">
                                    <div className="page-link" aria-label="Previous">
                                        <span aria-hidden="true">«</span>
                                        <span className="sr-only">Previous</span>
                                    </div>
                                </li>
                                <li className="page-item"><span className="page-link">1</span></li>
                                <li className="page-item"><span className="page-link">2</span></li>
                                <li className="page-item"><span className="page-link">3</span></li>
                                <li className="page-item">
                                    <div className="page-link" aria-label="Next">
                                        <span aria-hidden="true">»</span>
                                        <span className="sr-only">Next</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default NewsArea