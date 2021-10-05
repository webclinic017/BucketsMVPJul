import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Logo from "./partials/Logo";
import FooterNav from "./partials/FooterNav";
import FooterSocial from "./partials/FooterSocial";
import { Link } from "react-router-dom";

const propTypes = {
  topOuterDivider: PropTypes.bool,
  topDivider: PropTypes.bool,
};

const defaultProps = {
  topOuterDivider: false,
  topDivider: false,
};

const Footer = ({ className, topOuterDivider, topDivider, ...props }) => {
  const classes = classNames(
    "site-footer center-content-mobile",
    topOuterDivider && "has-top-divider",
    className
  );

  return (
    <footer {...props} className={classes}>
      <div className="container">
        <div
          className={classNames(
            "site-footer-inner",
            topDivider && "has-top-divider"
          )}
        >
          <div className="footer-top space-between text-xxs">
            <Logo />
            <FooterSocial />
          </div>
          <div className="footer-bottom space-between text-xxs invert-order-desktop">
            <FooterNav />
            <div className="footer-copyright">
              <p>
                The content on this website is for informational purposes only.
                Nothing on this website should be considered an offer,
                solicitation of an offer, or advice to buy or sell securities.
                Past performance is no guarantee of future results. Any
                historical returns, expected returns are hypothetical in nature
                and may not reflect actual future performance. Account holdings
                are for illustrative purposes only and are not investment
                recommendations.Certain investments are not suitable for all
                investors. Before investing, consider your investment
                objectives. The rate of return on investments can vary widely
                over time, especially for long term investments.
              </p>
              <Link to="#">Terms</Link> · <Link to="#">Privacy Policy</Link> ·{" "}
              <p>Contact: info@bucketsinvesting.com</p>
              Made by{" "}
              <a href="https://bucketsinvesting.com">Buckets Investing</a>. All
              right reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer;
