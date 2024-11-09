import React from 'react'
// Import Counter
import { CountUp } from 'use-count-up'
// import Img
import img1 from '../../../assets/img/icon/user.png'
import img2 from '../../../assets/img/icon/bank.png'
import img3 from '../../../assets/img/icon/world-map.png'
import img4 from '../../../assets/img/icon/calander.png'

const Counter = () => {

    const CounterData =[
        {
            img:img1,
            count:2348,
            heading:"Partners"
        },
        {
            img:img2,
            count:1748,
            heading:"Partners"
        },
        {
            img:img3,
            count:4287,
            heading:"Destinations"
        },
        {
            img:img4,
            count:40,
            heading:"Booking"
        },

    ]

  return (
    <>
     <section id="counter_area" className="section_padding_bottom">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 ">
                    <div className="counter_area_wrapper">
                        <div className="row">
                            {CounterData.map((data, index) => (
                                 <div className="col-lg-3 col-md-6 clo-sm-12 col-12" key={index}>
                                 <div className="counter_item">
                                     <img src={data.img} alt="icon" />
                                     <h3 className="counter"><CountUp isCounting end={data.count} duration={3.2} /></h3>
                                     <h6>{data.heading}</h6>
                                 </div>
                             </div>
                            ))}
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default Counter