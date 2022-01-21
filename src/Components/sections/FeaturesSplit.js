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
    title: "Power like Never Before",
    paragraph:
      "Custom investment products were traditionally reserved only for billionaire investors and funds. We are here to bring them to you. Outperform the market and manage risk better than ever before.",
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
                  zero Management Fees
                </div>
                <h3 data-aos="fade-up" className="mt-0 mb-12">
                  ETF? Or Better?
                </h3>
                <p data-aos="fade-up" className="m-0">
                  No management fees. Compare performance to the market, measure risk and review the sector breakdown before buying a bucket to better manage risk and maximize returns. 
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
                  src={require("../../Assets/images/analytics.gif").default}
                  alt="Buckets Investing IOS"
                  data-aos="fade-left"
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
                  Customizable unlike ETFs and Mutual Funds
                </div>
                <h3 data-aos="fade-up" className="mt-0 mb-12">
                  Complete control
                </h3>
                <p data-aos="fade-up" className="m-0">
                  Create your own buckets and share with friends. Invest through your SIPC insured Robinhood brokerage account.
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
                  src={require("../../Assets/images/control.gif").default}
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
                <h3 data-aos="fade-up" className="mt-0 mb-12">
                  Copy changes with a click
                </h3>
                <p data-aos="fade-up" className="m-0">
                  Follow other influential investors and your friends to get
                  notified when they make trades. Collaborate on investments
                  effortlessly using the in-built copy trade features.
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
                  src={require("../../Assets/images/copy.gif").default}
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
                  Portfolio management made easy
                </div>
                <h3 data-aos="fade-up" className="mt-0 mb-12">
                  For both pros and beginners
                </h3>
                <p data-aos="fade-up" className="m-0">
                  Feel like an asset manager with the power to bulk edit your ideas
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
                  src={require("../../Assets/images/shares.gif").default}
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
