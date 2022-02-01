import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { SectionProps } from "../../Utils/SectionProps";
import Input from "../elements/Input";
import Button from "../elements/Button";
import axios from "axios";
const propTypes = {
  ...SectionProps.types,
  split: PropTypes.bool,
};

const defaultProps = {
  ...SectionProps.defaults,
  split: false,
};

const Cta = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  split,
  addToList,
  ...props
}) => {
  const onAdd = () => {
    addToList();
  };
  const outerClasses = classNames(
    "cta section center-content-mobile reveal-from-bottom",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "cta-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider",
    split && "cta-split"
  );

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <div className="cta-slogan">
            <h3 className="m-0">Get Early Access</h3>
            <h4 className="m-0">We won't spam you, we promise </h4>
          </div>
          <div className="cta-action">
            <Input
              id="newsletter"
              type="email"
              label="Subscribe"
              labelHidden
              hasIcon="right"
              pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
              required
              placeholder="Your best email"
            >
              <svg
                className="addWaitingList"
                width="16"
                height="12"
                xmlns="http://www.w3.org/2000/svg"
                onClick={onAdd}
              >
                <path
                  d="M9 5H1c-.6 0-1 .4-1 1s.4 1 1 1h8v5l7-6-7-6v5z"
                  fill="#376DF9"
                />
              </svg>
            </Input>
            <label className="updateDisclosure">
              <u>
                {" "}
                By signing up you agree to receive email updates from
                bucketsinvesting.com
              </u>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

Cta.propTypes = propTypes;
Cta.defaultProps = defaultProps;

export default Cta;
