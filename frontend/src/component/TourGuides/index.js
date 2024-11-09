import React from 'react'
// Import Section Heading
import SectionHeading from '../Common/SectionHeading'

import { GuideData } from './GuideData'

import GuideCard from './GuideCard'

const TourGuidesArea = () => {
  return (
    <>
    <section id="tour_guides_area" className="section_padding">
        <div className="container">
            <SectionHeading heading="Meet with our experienced team members"/>
            <div className="row">
                <div className="col-lg-12">
                    <div className="guide_heading_area">
                        <h3>Our leaders</h3>
                    </div>
                </div>
                {GuideData.map((data, index)=>(
                    <GuideCard img={data.img} des={data.des} name={data.name} key={index} />
                ))}
            </div>
        </div>
    </section>
    </>
  )
}

export default TourGuidesArea