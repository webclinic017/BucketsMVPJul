import React, { useEffect } from "react";
import classNames from "classnames";
import { SectionSplitProps } from "../../Utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Image from "../elements/Image";
const propTypes = {
  ...SectionSplitProps.types,
};

const defaultProps = {
  ...SectionSplitProps.defaults,
};

const FeaturesSplit = ({
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
  const outerClasses = classNames(
    "features-split section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );
  const innerClasses = classNames(
    "features-split-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const splitClasses = classNames(
    "split-wrap",
    invertMobile && "invert-mobile",
    invertDesktop && "invert-desktop",
    alignTop && "align-top"
  );

  const sectionHeader = {
    title: "Sophisticated investing simplified",
    paragraph:
      "Custom investment products were traditionally reserved only for billionaire investors and funds. We are here to bring them to you. ",
  };

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader
            data-aos="fade-up"
            data={sectionHeader}
            className="center-content"
          />
          <div className={splitClasses}>
            <div className="split-item">
              <div
                className="split-item-content center-content-mobile reveal-from-left"
                data-reveal-container=".split-item"
              >
                <div
                  data-aos="fade-up"
                  className="text-xxs text-color-primary fw-600 tt-u mb-8"
                >
                  Lightning fast workflow
                </div>
                <h2 data-aos="fade-up" className="mt-0 mb-12">
                  Complete control
                </h2>
                <p data-aos="fade-up" className="m-0">
                  Create your own buckets and share with friends. Invest via an
                  existing brokerage account or create a new one.
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
                  src={require("../../Assets/images/iphone1.webp").default}
                  alt="Buckets Investing IOS"
                  data-aos="fade-left"
                  width={50}
                  height={101}
                />
              </div>
            </div>

            <div className="split-item">
              <div
                className="split-item-content center-content-mobile reveal-from-right"
                data-reveal-container=".split-item"
              >
                <div
                  data-aos="fade-up"
                  className="text-xxs text-color-primary fw-600 tt-u mb-8"
                >
                  Invest smarter together
                </div>
                <h2 data-aos="fade-up" className="mt-0 mb-12">
                  Rebalance with a couple of clicks
                </h2>
                <p data-aos="fade-up" className="m-0">
                  Follow other influential investors and your friends to get
                  notified when they make trades. Collaborate on investments
                  effortlessly using the in-built rebalancing features.
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
                  src={require("../../Assets/images/iphone2.webp").default}
                  alt="Buckets Investing IOS"
                  data-aos="fade-right"
                  width={528}
                  height={396}
                />
              </div>
            </div>

            <div className="split-item">
              <div
                className="split-item-content center-content-mobile reveal-from-left"
                data-reveal-container=".split-item"
              >
                <div
                  data-aos="fade-up"
                  className="text-xxs text-color-primary fw-600 tt-u mb-8"
                >
                  More money in your pockets
                </div>
                <h2 data-aos="fade-up" className="mt-0 mb-12">
                  Minimize management fees
                </h2>
                <p data-aos="fade-up" className="m-0">
                  Management fees compound. If you invested in the S&P500 with a
                  management fee of 1% 20 years ago, it would have costed you
                  more than 23% of your money by today.
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
                  src={require("../../Assets/images/iphone3.webp").default}
                  alt="Buckets Investing IOS"
                  data-aos="fade-left"
                  width={528}
                  height={396}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;
