import React, { useState } from "react";
// import sections
import Footer from "../Components/layout/Footer";
import { Helmet } from "react-helmet";
import Image from "../Components/elements/Image";
import classNames from "classnames";
import { SectionSplitProps } from "../Utils/SectionProps";
import Header from "../Components/layout/Header";
import SectionHeader from "../Components/sections/partials/SectionHeader";
const propTypes = {
  ...SectionSplitProps.types,
};

const defaultProps = {
  ...SectionSplitProps.defaults,
};

const About = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  ...props
}) => {
  const splitClasses = classNames(
    "split-wrap",
    invertMobile && "invert-mobile",
    invertDesktop && "invert-desktop",
    alignTop && "align-top"
  );
  const innerClasses = classNames(
    "features-split-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );
  const sectionHeader = {
    title: "Invest in Ideas",
    paragraph: "",
  };
  const sectionHeaderCompany = {
    title: "Our Company",
    paragraph:
      "Build a diversified portfolio and invest in trending market sectors and themes through intelligently structured model portfolios at Buckets Investing. Smart and sophisticated investment management has never been easier.",
  };
  return (
    <div className="landing">
      <Header />

      <div className="container about">
        <SectionHeader
          data={sectionHeader}
          className="center-content aboutTitle"
        />

        <div className="bannerWrapper">
          <Image
            src={require("./../Assets/images/investingIdea.gif").default}
            alt="Hero"
            className="aboutBanner"
          />
        </div>
        <SectionHeader
          data={sectionHeaderCompany}
          className="center-content "
        />
        <div className="aboutTeamHeader">
          <h2 class="mt-0 mb-0">Our Team</h2>
        </div>
        <div className={innerClasses}>
          <div className={splitClasses}>
            <div className="split-item">
              <div
                className="split-item-content center-content-mobile reveal-from-right"
                data-reveal-container=".split-item"
              >
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Founder
                </div>
                <h4 className="mt-0 mb-12">Akash Gupta</h4>
                <p className="m-0">
                  I bought my first stock, ticker: ATVI, at the age of 13 and
                  immediately fell in love with the world of investing. Hungry
                  to learn, I read books on Warren Buffett’s investing style. I
                  remember the rush of excitement I felt when BNN’s Market Call
                  show accepted my phone call and the analyst on air gave me his
                  opinion on a stock I was considering. In fact, for a grade 7
                  magazine project, I drew the picture on the left titled
                  “investment firm - why waste your time when you have the top
                  brokers waiting for you?” I guess this is exactly what I am
                  living and breathing every day with Buckets Investing. Despite
                  doing an undergrad degree in Engineering at the University of
                  Alberta, I found my way to trading and research at RBC Capital
                  Markets in Toronto and NYC. My investing journey has been full
                  of ups and downs. The initial steep learning curve was
                  difficult and I thought I could win with single stock picking
                  but this was far from how it actually played out.
                </p>
              </div>
              <div
                className={classNames(
                  "split-item-image center-content-mobile reveal-from-bottom",
                  imageFill && "split-item-image-fill"
                )}
                data-reveal-container=".split-item"
              >
                <Image
                  src={require("../Assets/images/img_2920_720.webp").default}
                  alt="Buckets Investing Teams"
                  className="aboutImage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
