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

const Competition = ({
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
    title: "Best in Class",
    paragraph:
      "Ideas structured by professionals at your fingertips. Buckets is the simplest way to build intelligently structured long-term portfolios for free. Unlike ETFs, Buckets are completely customizable and have no management fees.",
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
          <div
            className={splitClasses}
            className="text-center"
            style={{ overflowX: "auto", overflowY: "hidden" }}
          >
            <table data-aos="fade-up" className="table-auto">
              <thead>
                <tr>
                  <th></th>
                  <th className="text-center">5Y Performance</th>
                  <th className="text-center">Fees</th>
                  <th className="text-center">Min. Investment</th>
                  <th className="text-center">Control</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr className="text-white font-bold">
                  <td
                    style={{
                      borderTopLeftRadius: 8,
                      borderBottomLeftRadius: 8,
                    }}
                    bgcolor="#40DF9F"
                    className="font-bold"
                  >
                    Too Big to Fail (Bucket) *
                  </td>
                  <td bgcolor="#40DF9F">+34.37%</td>
                  <td bgcolor="#40DF9F">0.00%</td>
                  <td bgcolor="#40DF9F">$10</td>
                  <td
                    style={{
                      borderTopRightRadius: 8,
                      borderBottomRightRadius: 8,
                    }}
                    bgcolor="#40DF9F"
                  >
                    Full
                  </td>
                </tr>
                <tr>
                  <td className="font-bold">S{"&"}P 500</td>
                  <td>+16.07%</td>
                  <td>0.03%</td>
                  <td>$440</td>
                  <td>None</td>
                </tr>
                <tr>
                  <td className="font-bold">Wealthfront</td>
                  <td>+12.38%</td>
                  <td>0.25%</td>
                  <td>$500</td>
                  <td>Limited</td>
                </tr>
                <tr>
                  <td className="font-bold">Acorns (Aggressive Basket)</td>
                  <td>+11.72%</td>
                  <td>0.08%</td>
                  <td>$5</td>
                  <td>None</td>
                </tr>
                <tr>
                  <td className="font-bold">Titan Invest</td>
                  <td>+20.04%</td>
                  <td>1.00%</td>
                  <td>$100</td>
                  <td>None</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

Competition.propTypes = propTypes;
Competition.defaultProps = defaultProps;

export default Competition;
