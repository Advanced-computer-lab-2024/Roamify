import React from "react";
// import SectionHeading
import SectionHeading from "../Common/SectionHeading";
// import Data
import { FaqsData } from "./FaqsData";
// import Icon
import Icon from '../../assets/img/icon/call.png'

const AllFaqs = () => {
  return (
    <>
      <section id="faqs_main_arae" className="section_padding">
        <div className="container">
          <SectionHeading heading="Frequent answer and question" />

          <div className="faqs_area_top">
            <div className="row">
              <div className="col-lg-8">
                <div className="faqs_three_area_wrapper">
                  {/* <!-- Item One --> */}
                  {FaqsData.map((data, index) => (
                    <div className="faqs_item_wrapper" key={index}>
                      <h3>{data.area_heading}</h3>
                      <div className="faqs_main_item">
                        <div className="accordion" id={"accordionExample" + index}>
                          {data.data.map((data, index1) => (
                            <div className="accordion-item" key={index1}>
                              <h2
                                className="accordion-header"
                                id={"heading" + index1}
                              >
                                <button
                                  className="accordion-button"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target={"#collapse" + index + index1}
                                  aria-expanded="true"
                                  aria-controls="collapseOne"
                                >
                                  {data.heading}
                                </button>
                              </h2>
                              <div
                                id={"collapse" + index + index1}
                                className={
                                  index1 === 0
                                    ? "accordion-collapse show"
                                    : "accordion-collapse collapse"
                                }
                                aria-labelledby={"heading" + index + index1}
                                data-bs-parent={"#accordionExample" + index}
                              >
                                <div className="accordion-body">
                                  <p>{data.para}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="faqs_call_area">
                  <img src={Icon} alt="img" />
                  <h5>Contact us 24/7</h5>
                  <h3>
                    <a href="tel:+00-123-456-789">+00 123 456 789</a>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AllFaqs;
