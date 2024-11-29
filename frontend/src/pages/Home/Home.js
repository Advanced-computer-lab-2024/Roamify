import React, { useState, useEffect } from "react";
import SearchForm from "../../component/Home/SearchForm";
import Discover from "../../component/Home/Discover";
import TopDestinations from "../../component/Home/TopDestinations";
import ExploreArea from "../../component/Home/Explore";
import SpecialOffer from "../../component/Home/SpecialOffers";
import PromotionalTours from "../../component/Home/PromotionalTours";
import DestinationsArea from "../../component/Home/Destinations";
import BlogMain from "../../component/Home/LatestNews";
import HomeBanner from "./HomeBanner";
import Dot from "./Dot";
import HomeHeader from "./HomeHeader";
import { HeaderData } from "./HomeHeaderData";
import CopyRight from "../../layout/CopyRight";

const Home = () => {
  const sections = [
    "homeBanner",
    "topDestinations",
    "exploreArea",
    "promotionalTours",
    "blogMain",
  ];

  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let mostVisibleSection = currentSection;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.indexOf(entry.target.id);
            if (index !== -1) {
              mostVisibleSection = index;
            }
          }
        });

        // Update the currentSection state only if it changes
        if (mostVisibleSection !== currentSection) {
          setCurrentSection(mostVisibleSection);
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    // Handle scrolling to the very top
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setCurrentSection(0); // Force the first section to be active
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect(); // Clean up observer
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections, currentSection]);

  return (
    <div style={{ position: "relative" }}>
      {/* Scroll Indicator */}
      <nav
        style={{
          position: "fixed",
          right: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          zIndex: 1000,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          padding: "10px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        {sections.map((id, index) => (
          <Dot
            key={index}
            sectionId={id}
            isActive={index === currentSection} // Highlight current section
            onClick={() =>
              document.getElementById(id).scrollIntoView({ behavior: "smooth" })
            }
          />
        ))}
      </nav>

      <HomeHeader HeaderData={HeaderData} />
      {/* Main Content */}
      <section id="homeBanner">
        <HomeBanner />
      </section>
      {/* <section id="searchForm">
        <SearchForm />
      </section> */}
      <section id="discover">
        <Discover />
      </section>
      <section id="topDestinations">
        <TopDestinations />
      </section>
      <section id="exploreArea">
        <ExploreArea />
      </section>
      <section id="specialOffer">
        <SpecialOffer />
      </section>
      <section id="promotionalTours">
        <PromotionalTours />
      </section>
      <section id="destinationsArea">
        <DestinationsArea />
      </section>
      <section id="blogMain">
        <BlogMain />
      </section>
      <CopyRight />
    </div>
  );
};

export default Home;
