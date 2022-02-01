import React from "react";
import classNames from "classnames";
import { SectionTilesProps } from "../../Utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Image from "../elements/Image";

const propTypes = {
  ...SectionTilesProps.types,
};

const defaultProps = {
  ...SectionTilesProps.defaults,
};

const Story = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  data,
  ...props
}) => {
  const outerClasses = classNames(
    "testimonial section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "testimonial-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const tilesClasses = classNames("tiles-wrap", pushLeft && "push-left");

  const sectionHeader = {
    title: "Our stories",
    paragraph: "Here is what some users had to say about our demo product:",
  };

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={tilesClasses}>
            {data.sort((a, b) => b.sort - a.sort).slice(0, 3).map((item) => (
              <a href={item.link} target="_blank">
                <div
                  className="tiles-item reveal-from-right"
                  data-reveal-delay="200"
                  data-aos="fade-up"
                >
                  <div>
                    <div
                      style={{
                        backgroundImage: `url("` + item.image.uri + `")`,
                        width: "100%",
                        height: 250,
                        backgroundRepeat: "no-repeat",
                        backgroundPositionX: "center",
                        backgroundPositionY: "center",
                        backgroundSize: "cover",
                        borderRadius: 25,
                      }}
                    ></div>
                    <h3 style={{ height: 84 }}>{item.title}</h3>

                    <label className="text-xxs mb-0">
                      3 days ago·4 min read
                    </label>
                    <div
                      className="story-item-content "
                      style={{ backgroundImage: undefined }}
                    >
                      <p className="text-sm mb-0 storyText">{item.content}</p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

Story.propTypes = propTypes;
Story.defaultProps = defaultProps;

export default Story;
