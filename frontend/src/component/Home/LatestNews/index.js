import React from 'react'
// Import Link
import { Link } from 'react-router-dom'
// Import Section Heading
import SectionHeading from '../../Common/SectionHeading'
// Import Data
import { NewsData } from './NewsData'
// import img
import bigImg from '../../../assets/img/news/news-big.png'



const BlogMain = () => {
  return (
    <>
    <section id="home_news" className="section_padding_top">
        <div className="container">
            <SectionHeading heading="Latest travel news" />
            <div className="row">
                <div className="col-lg-6">
                    <div className="home_news_left_wrapper">
                        {NewsData.map((data, index) =>(
                             <div className="home_news_item" key={index}>
                             <div className="home_news_img">
                                 <Link to="#!"><img src={data.img} alt="img" /></Link>
                             </div>
                             <div className="home_news_content">
                                 <h3><Link to="#!">{data.heading}</Link></h3>
                                 <p><Link to="#!">{data.date}</Link> <span> <i className="fas fa-circle"></i>{data.read}</span> </p>
                             </div>
                         </div>
                        ))}
                       
                        <div className="home_news_item">
                            <div className="seeall_link">
                                <Link to="#!">See all article <i className="fas fa-arrow-right"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="home_news_big">
                        <div className="news_home_bigest img_hover">
                            <Link to="#!"><img src={bigImg} alt="img" /></Link>
                        </div>
                        <h3><Link to="#!">There are many variations of passages available but</Link> </h3>
                        <p>It is a long established fact that a reader will be distracted by the readable content of.
                            The point of using Lorem Ipsum is that it has a more</p>
                        <p>It is a long established fact that a reader will be distracted by the readable long
                            established fact that a reader will be distracted content of a
                            page when looking at its layout.</p>
                        <Link to="#!">Read full article <i className="fas fa-arrow-right"></i></Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default BlogMain