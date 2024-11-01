import React from 'react'
// import Section Heading 
import SectionHeading from '../../Common/SectionHeading'
// import Card
import DestinationsCard from './DestinationsCard'
// import Data
import { DestinationsData } from './DestinationsData'

const DestinationsArea = () => {
  return (
    <>
         <section id="destinations_area" className="section_padding_top">
        <div className="container">
            <SectionHeading heading="Destinations for you" />
           
            <div className="row">
                <div className="col-lg-10 offset-lg-1">
                    <div className="theme_nav_tab">
                        <nav className="theme_nav_tab_item">
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <button className="nav-link active" id="nav-nepal-tab" data-bs-toggle="tab"
                                    data-bs-target="#nav-nepal" type="button" role="tab" aria-controls="nav-nepal"
                                    aria-selected="true">Nepal</button>
                                <button className="nav-link" id="nav-malaysia-tab" data-bs-toggle="tab"
                                    data-bs-target="#nav-malaysia" type="button" role="tab" aria-controls="nav-malaysia"
                                    aria-selected="false">Malaysia</button>
                                <button className="nav-link" id="nav-indonesia-tab" data-bs-toggle="tab"
                                    data-bs-target="#nav-indonesia" type="button" role="tab"
                                    aria-controls="nav-indonesia" aria-selected="false">Indonesia</button>
                                <button className="nav-link" id="nav-turkey-tab" data-bs-toggle="tab"
                                    data-bs-target="#nav-turkey" type="button" role="tab" aria-controls="nav-turkey"
                                    aria-selected="false">Turkey</button>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="tab-content" id="nav-tabContent1">
                        <div className="tab-pane fade show active" id="nav-nepal" role="tabpanel"
                            aria-labelledby="nav-nepal-tab">
                            <div className="row">
                                {DestinationsData.map((data, index)=>(
                                    <DestinationsCard img={data.img} heading={data.heading} price={data.Price} key={index}/>
                                ))}
                            </div>
                        </div>
                        <div className="tab-pane fade" id="nav-malaysia" role="tabpanel" aria-labelledby="nav-malaysia-tab">
                        <div className="row">
                                {DestinationsData.map((data, index)=>(
                                    <DestinationsCard img={data.img} heading={data.heading} price={data.Price} key={index}/>
                                ))}
                            </div>
                        </div>
                        <div className="tab-pane fade" id="nav-indonesia" role="tabpanel" aria-labelledby="nav-indonesia-tab">
                           <div className="row">
                                {DestinationsData.map((data, index)=>(
                                    <DestinationsCard img={data.img} heading={data.heading} price={data.Price} key={index}/>
                                ))}
                            </div>
                        </div>
                        <div className="tab-pane fade" id="nav-turkey" role="tabpanel" aria-labelledby="nav-turkey-tab">
                        <div className="row">
                                {DestinationsData.map((data, index)=>(
                                    <DestinationsCard img={data.img} heading={data.heading} price={data.Price} key={index}/>
                                ))}
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default DestinationsArea