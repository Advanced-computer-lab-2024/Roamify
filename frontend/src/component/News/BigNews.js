import React from "react";
import { Link } from "react-router-dom";
// import Img
import BigImg from "../../assets/img/news/news-big.png"
import AuthImg from "../../assets/img/news/author-1.png"


const BigNews = () => {
  return (
    <>
      <div className="row">
        <div className="col-lg-7">
          <div className="news_area_top_left">
            <a href="news-details.html">
              <img src={BigImg} alt="img" />
            </a>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="news_area_top_right">
            <h2>
              <Link to="/news-details">
                Veniam ex tempor qui ad amet mollit cillum aliqua aliqua. Fugiat
                tempor eu magna
              </Link>
            </h2>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more. Ad minim in
              commodo fugiat adipisicing cupidatat tempor aliqua.
            </p>
            <Link to="/news-details">
              Read full article <i className="fas fa-arrow-right"></i>
            </Link>
            <div className="news_author_area">
              <div className="news_author_img">
                <img src={AuthImg} alt="img" />
              </div>
              <div className="news_author_area_name">
                <h4>Melisa campbell</h4>
                <p>
                  <Link to="/news-details">26 Oct 2021</Link>
                  <i className="fas fa-circle"></i> 8 min read
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BigNews;
