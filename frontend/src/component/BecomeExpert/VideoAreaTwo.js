import React from 'react'
// import Img
import Img from "../../assets/img/common/video-two.png"
// Import Icon
import Icon from "../../assets/img/icon/exp-sm-1.png"
import Icon2 from "../../assets/img/icon/exp-sm-2.png"
import Icon3 from "../../assets/img/icon/exp-sm-3.png"


const VideoAreaTwo = () => {
    const data = [
        {
            img:Icon,
            heading:"Lowest price guaranteed",
            para:"Mollit aliqua proident enim consectetur ad nostrud. Id et magna irure fugiat ea sit eu cupidatat."
        },
        {
            img:Icon2,
            heading:"Easy and quick booking",
            para:"Exercitation adipisicing aliquip laboris reprehenderit cupidatat labore excepteur."
        },
        {
            img:Icon3,
            heading:"24/7 Customer support",
            para:"Fugiat dolor enim est proident ea id veniam nulla ipsum cillum aliqua."
        },
    ]
  return (
    <>
     <section id="video_area_two">
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <div className="video_two_left_side">
                        <h2>Benefit of become a local expert</h2>
                        <p>Mollit aliqua proident enim consectetur ad nostrud. Id et magna irure fugiat ea sit eu cupidatat.</p>
                        <div className="video_exp_wrapper">
                        {data.map((data1, index) =>(
                             <div className="video_exp_item" key={index}>
                             <div className="video_exp_icon">
                                 <img src={data1.img} alt="icon" />
                             </div>
                             <div className="video_exp_text">
                                 <h3>{data1.heading}</h3>
                                 <p>{data1.para}</p>
                             </div>
                         </div>
                        ))}
                           
                          
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="video_two_right_side">
                        <img src={Img} alt="img"/>
                        <div className="video_two_play_area">
                            <a className="video_btn video_play_area"  href="#!"
                                title="Youtube Video"><i className="fas fa-play"></i></a>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default VideoAreaTwo