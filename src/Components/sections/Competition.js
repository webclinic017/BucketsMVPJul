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
      "Intelligently structured baskets made by experts at your fingertips ",
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
          <div className={splitClasses} class="text-center">
          <table data-aos="fade-up" class="table-auto" >
            <thead >
                <tr>
                <th></th>
                <th class="text-center">Performance</th>
                <th class="text-center">Fees</th>
                <th class="text-center">Min. Investment</th>
                <th class="text-center">Control</th>
                </tr>
            </thead>
            <tbody class="text-center">
                <tr bgcolor="primary">
                <td class="font-bold">Too Big to Fail (Bucket) *</td>
                <td>+33.32%</td>
                <td>0.00%</td>
                <td>$10</td>
                <td>Full</td>
                </tr>
                <tr>
                <td class="font-bold">S{'&'}P 500</td>
                <td>+16.07%</td>
                <td>0.03%</td>
                <td>$440</td>
                <td>None</td>
                </tr>
                <tr>
                <td class="font-bold">Wealthfront</td>
                <td>+12.38%</td>
                <td>0.25%</td>
                <td>$500</td>
                <td>Limited</td>
                </tr>
                <tr>
                <td class="font-bold">Acorns (Aggressive Basket)</td>
                <td>+11.72%</td>
                <td>0.08%</td>
                <td>$5</td>
                <td>None</td>
                </tr>
                <tr>
                <td class="font-bold">Titan Invest</td>
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
