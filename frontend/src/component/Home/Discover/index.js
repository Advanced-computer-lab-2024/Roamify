import React from 'react'
// Discover Data
import { DiscoverData } from './DiscoverData'
// Discover Card
import DiscoverCard from './DiscoverCard'

const Discover = () => {
  return (
    <>
       <section id="go_beyond_area" className="section_padding_top">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                    <div className="heading_left_area">
                        <h2>Go beyond your <span>imagination</span></h2>
                        <h5>Discover your ideal experience with us</h5>
                    </div>
                </div>
                {DiscoverData.map((data, index) => (
                     <DiscoverCard data={data} key={index} /> 
                ))}

            </div>
        </div>
    </section>
    </>
  )
}

export default Discover