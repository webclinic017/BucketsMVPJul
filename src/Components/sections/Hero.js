import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { SectionProps } from "../../Utils/SectionProps";
import ButtonGroup from "../elements/ButtonGroup";
import Button from "../elements/Button";
import Image from "../elements/Image";
import Modal from "../elements/Modal";
// import Deck from "../../Deck";
import { Link } from "react-router-dom";
const propTypes = {
  ...SectionProps.types,
};

const defaultProps = {
  ...SectionProps.defaults,
};

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {
  const [videoModalActive, setVideomodalactive] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  };

  const outerClasses = classNames(
    "hero section center-content ",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "hero-inner section-inner removeBottomPadding",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  return (
    <section {...props} className={outerClasses}>
      <div data-aos="fade-up" className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h2
              className="mt-7 mb-16 reveal-from-bottom"
              data-reveal-delay="200"
              data-aos="fade-up"
            >
              <span className="text-color-primary">Invest </span> 
               in Model Portfolios for Free
            </h2>
            <div className="container-xs">
              <p
                className="m-0 mb-32 reveal-from-bottom"
                data-reveal-delay="400"
                data-aos="fade-up"
              >
                by simply linking your brokerage account. We do NOT store your brokerage credentials or ask for any personal information. 
              </p>
              <div className="reveal-from-bottom" data-reveal-delay="600">
                <ButtonGroup data-aos="fade-up">
                <div className="downloadBtn">
          <a
            href="https://testflight.apple.com/join/qsc0mMGU"
            className="downloadTextWrapper"
          >
            <label className="downloadText">Get it for iPhone</label>
          </a>
        </div>

        <div className="downloadBtn">
          <a
            href="https://www.bucketsinvesting.com/files/buckets_investing.apk"
            className="downloadTextWrapper"
          >
            <label className="downloadText">Get it for Android</label>
          </a>
        </div>
                  {/* <Button
                    tag="a"
                    color="primary"
                    wideMobile
                    href="#newsletterSection"
                    className="landingButton"
                  >
                    Get Access
                  </Button> */}
                  {/* <Link to="/demo">
                    <Button
                      tag="a"
                      color="dark"
                      wideMobile
                      className="landingButton"
                    >
                      View demo
                    </Button>
                  </Link> */}
                </ButtonGroup>
              </div>
            </div>
          </div>
          <div
            className="hero-figure reveal-from-bottom illustration-element-01"
            data-reveal-value="20px"
            data-reveal-delay="800"
          >
            {/* <Image 
                  src={require("../../Assets/images/canva.png").default}
                  width={2000}
                  height={768}
              /> */}

            {/* <Deck /> */}

            {/* <a
              data-video="https://player.vimeo.com/video/174002812"
              href="#0"
              aria-controls="video-modal"
              onClick={openModal}
            >
              <Image
                className="has-shadow"
                src={
                  require("./../../Assets/images/video-placeholder.jpg").default
                }
                alt="Hero"
                width={896}
                height={504}
              />
            </a> */}
          </div>
          <Modal
            id="video-modal"
            show={videoModalActive}
            handleClose={closeModal}
            video="https://player.vimeo.com/video/174002812"
            videoTag="iframe"
          />
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;
