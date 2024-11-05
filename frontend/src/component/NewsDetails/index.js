import React from 'react'
// import Commnent
import CommentForm from './CommentForm';
import CommentArea from './CommentArea';
import SideBar from './SideBar';
import BigImg from "../../assets/img/news/news-details.png"
import Img1 from "../../assets/img/news/news_details_left.png"
import Img2 from "../../assets/img/news/news_details_right.png"
import Icon from "../../assets/img/icon/pdf.png"



const NewsDetilsArea = () => {

  return (
    <>
      <section id="news_details_main_arae" className="section_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="news_detail_wrapper">
                <div className="news_details_content_area">
                      <img src={BigImg} alt="img" />
                      <h2>Revolutionising the travel industry</h2>
                  <p>
                    Lorem ipsum dolor sit amet, cibo mundi ea duo, vim exerci
                    phaedrum. There are many variations of passages of Lorem
                    Ipsum available but the majority.
                  </p>
                  <p>
                    If you are going to use a passage of Lorem Ipsum, you need
                    to be sure there isn't anything embarrang hidden in the
                    middle of text. All the Lorem Ipsum generators on the
                    Internet tend to repeat predefined chunks as necessary,
                    making this the first true.
                  </p>
                  <h3>We want to ensure the education for the kids.</h3>
                  <p>
                    Lorem ipsum dolor sit amet, cibo mundi ea duo, vim exerci
                    phaedrum. There are many variations of passages of Lorem
                    Ipsum available, but the majority have alteration in some
                    injected or words which don't look even slightly believable.
                  </p>
                  <ul>
                    <li>
                      <i className="fas fa-circle"></i> Lorem ipsum dolor sit amet,
                      cibo mundi ea duo, vim exerci phaedrum.
                    </li>
                    <li>
                      <i className="fas fa-circle"></i> There are many variations of
                      passages of Lorem Ipsum.
                    </li>
                    <li>
                      <i className="fas fa-circle"></i> Available but the majority
                      have alteration in some injected or words.
                    </li>
                    <li>
                      <i className="fas fa-circle"></i> There are many variations of
                      passages of Lorem Ipsum which don't look even slightly
                      believable.
                    </li>
                  </ul>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="news_details_left_img">
                        <img
                          src={Img1}
                          alt="img"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="news_details_left_img">
                        <img
                          src={Img2}
                          alt="img"
                        />
                      </div>
                    </div>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, cibo mundi ea duo, vim exerci
                    phaedrum. There are many variations of passages of Lorem
                    Ipsum available, but the majority have alteration in some
                    injected or words which don't look even slightly believable.
                  </p>
                </div>
                <div className="download_pdf_area">
                  <div className="downloads_pdf_icon">
                    <img src={Icon} alt="icon" />
                    <h3>Travel guide for explorer.pdf</h3>
                  </div>
                  <div className="downloads_pdf_button">
                    <button className="btn btn_theme btn_md">Download pdf</button>
                  </div>
                </div>
                <CommentArea/>
               <CommentForm/>
              </div>
            </div>
            <div className="col-lg-4">
             <SideBar/>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsDetilsArea;
