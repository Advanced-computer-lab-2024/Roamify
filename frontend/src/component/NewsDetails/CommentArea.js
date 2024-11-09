import React from "react";
//Import Comment Img
import Img1 from "../../assets/img/news/comment.png"
import Img2 from "../../assets/img/news/comment.png"
const CommentArea = () => {

    const CommnetData =[
        {
            img:Img1,
            name:"ames martin",
            comment:`Lorem ipsum dolor sit amet, cibo mundi ea duo, vim exerci
            phaedrum. There are many variations of passages of Lorem Ipsum
            available but the majority.`
        },
        
        {
            img:Img2,
            name:"ames martin",
            comment:`Lorem ipsum dolor sit amet, cibo mundi ea duo, vim exerci
            phaedrum. There are many variations of passages of Lorem Ipsum
            available but the majority.`
        },

    ]
  return (
    <>
      <div className="comment_area">
        <h3>2 Comments</h3>
        {CommnetData.map((data, index)=>(
             <div className="comment_area_boxed" key={index}>
             <div className="comment_img">
               <img src={data.img} alt="img" />
             </div>
             <div className="comment_text">
               <div className="comment_author_name">
                 <h4>{data.name}</h4>
                 <a href="#!">
                   <i className="fas fa-reply-all"></i> Reply
                 </a>
               </div>
               <p>{data.comment}</p>
             </div>
           </div>
        ))}
       
        
      </div>
    </>
  );
};

export default CommentArea;
