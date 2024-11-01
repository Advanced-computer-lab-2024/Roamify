import React from "react";
// import Data
import Img1 from "../../assets/img/news/recent-1.png"
import Img2 from "../../assets/img/news/recent-2.png"
import Img3 from "../../assets/img/news/recent-3.png"
import Img4 from "../../assets/img/news/recent-4.png"

const SideBar = () => {
    const RecentData = [
        {
            img:Img1,
            heading:" Ea exercitation qui nostrud sint labore irure in exercitation",
            date:"26 Oct 2021",
            readTime:"8 min read"
        },
        {
            img:Img2,
            heading:"Amet cupidatat aliqua dolor del proident veniam proident",
            date:"26 Oct 2021",
            readTime:"8 min read"
        },
        {
            img:Img3,
            heading:" Consequat enim aute sint sint ad et culpa eu magna",
            date:"26 Oct 2021",
            readTime:"8 min read"
        },
        {
            img:Img4,
            heading:" Proident dolore dolore cillum pelo aliquip irure elit",
            date:"26 Oct 2021",
            readTime:"8 min read"
        },

    ]
    const TagsData =[
        {tag:" Assistant", active:true },
        {tag:"Tours",  active:false},
        {tag:"Tour guide",  active:false },
        {tag:"Business",  active:false },
        {tag:"Corporate",  active:false },
        {tag:"Manager",  active:false },
        {tag:"Travel agency",  active:false },
        {tag:"Destination",  active:false }
    ]
  return (
    <>
      <div className="news_details_rightbar">
        <div className="news_details_right_item">
          <h3>Recent news</h3>
          {RecentData.map((data, index)=>(
            <div className="recent_news_item" key={index}>
            <div className="recent_news_img">
              <img src={data.img} alt="img" />
            </div>
            <div className="recent_news_text">
              <h5>
                <a href="news-details.html">
                  {data.heading}
                </a>
              </h5>
              <p>
                <a href="news.html">{data.date}</a>
                <i className="fas fa-circle"></i>{data.readTime}
              </p>
            </div>
          </div>
          ))}
          
        
        </div>
        <div className="news_details_right_item">
          <h3>Popular tags</h3>
          <div className="news_tags_area">
            <ul>
                {TagsData.map((data, index)=>(
                    <li key={index}> 
                        <a href="#!" className={data.active === true ? ("active" ):("" )} >{data.tag}</a>
                    </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="news_details_right_item">
          <h3>Share causes</h3>
          <div className="share_icon_area">
            <ul>
              <li>
                <a href="!#">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="!#">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="!#">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="!#">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
