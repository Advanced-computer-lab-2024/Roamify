import React from "react";
// import SectionHeading
import SectionHeading from "../Common/SectionHeading";
// import Icon
import Icon from  "../../assets/img/icon/exp-1.png"
import Icon1 from  "../../assets/img/icon/exp-2.png"
import Icon2 from  "../../assets/img/icon/exp-3.png"

const HowItWorks = () => {
    const data = [

        {
            img:Icon,
            heading:"Sign up",
            para:` Duis laboris culpa cupidatat do consequat esse officia ex.
            Reprehenderit quis est id sint ea dolore sint nostrud demos
            adipisicing.`
        },

        {
            img:Icon1,
            heading:"Add your service",
            para:` Duis laboris culpa cupidatat do consequat esse officia ex.
            Reprehenderit quis est id sint ea dolore sint nostrud demos
            adipisicing.`
        },

        {
            img:Icon2,
            heading:"Get booking",
            para:` Duis laboris culpa cupidatat do consequat esse officia ex.
            Reprehenderit quis est id sint ea dolore sint nostrud demos
            adipisicing.`
        },


     ]
  return (
    <>
      <section id="how_it_work_area" className="section_padding">
        <div className="container">
          {/* <!-- Section Heading --> */}
          <SectionHeading heading="How it works" />
          <div className="row">
            {data.map((data1, index)=>(
                 <div className="col-lg-4 col-md-6 col-sm-12 col-12" key={index}>
                 <div className="how_expert_boxed">
                   <img src={data1.img} alt="icon" />
                   <h3>{data1.heading}</h3>
                   <p>
                    {data1.para}
                   </p>
                 </div>
               </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
