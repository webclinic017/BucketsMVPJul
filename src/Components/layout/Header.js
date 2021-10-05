import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Logo from "./partials/Logo";
import Button from "../elements/Button";
import { useSelector } from "react-redux";
const propTypes = {
  navPosition: PropTypes.string,
  hideNav: PropTypes.bool,
  hideSignin: PropTypes.bool,
  bottomOuterDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool,
};

const defaultProps = {
  navPosition: "",
  hideNav: false,
  hideSignin: false,
  bottomOuterDivider: false,
  bottomDivider: false,
};

const Header = ({
  isDemo,
  className,
  navPosition,
  hideNav,
  hideSignin,
  bottomOuterDivider,
  bottomDivider,
  ...props
}) => {
  const [isActive, setIsactive] = useState(false);

  const nav = useRef(null);
  const hamburger = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    isActive && openMenu();
    document.addEventListener("keydown", keyPress);
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("keydown", keyPress);
      document.removeEventListener("click", clickOutside);
      closeMenu();
    };
  });

  const openMenu = () => {
    document.body.classList.add("off-nav-is-active");
    nav.current.style.maxHeight = nav.current.scrollHeight + "px";
    setIsactive(true);
  };

  const closeMenu = () => {
    document.body.classList.remove("off-nav-is-active");
    nav.current && (nav.current.style.maxHeight = null);
    setIsactive(false);
  };

  const keyPress = (e) => {
    isActive && e.keyCode === 27 && closeMenu();
  };

  const clickOutside = (e) => {
    if (!nav.current) return;
    if (
      !isActive ||
      nav.current.contains(e.target) ||
      e.target === hamburger.current
    )
      return;
    closeMenu();
  };

  const classes = classNames(
    "site-header",
    bottomOuterDivider && "has-bottom-divider",
    className
  );

  return (
    <header {...props} className={classes}>
      <div className="container">
        <div
          className={classNames(
            "site-header-inner",
            bottomDivider && "has-bottom-divider"
          )}
        >
          <Logo />
          {!hideNav && (
            <>
              <button
                ref={hamburger}
                className="header-nav-toggle"
                onClick={isActive ? closeMenu : openMenu}
              >
                <span className="screen-reader">Menu</span>
                <span className="hamburger">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
              <nav
                ref={nav}
                className={classNames("header-nav", isActive && "is-active")}
              >
                <div className="header-nav-inner">
                  {/* <ul
                    className={classNames(
                      "list-reset text-xs",
                      navPosition && `header-nav-${navPosition}`
                    )}
                  >
                    <li>
                      <Link to="#0" onClick={closeMenu}>
                        About Us
                      </Link>
                    </li>
                  </ul> */}
                  {!isDemo && (
                    <ul className="list-reset text-xs header-nav-right">
                      <li>
                        <Link to="/demo" onClick={closeMenu}>
                          Demo
                        </Link>
                      </li>
                      <li>
                        <Link to="/about" onClick={closeMenu}>
                          About Us
                        </Link>
                      </li>

                      <li>
                        <Button
                          tag="a"
                          color="primary"
                          wideMobile
                          href="/#newsletter"
                          className="button button-primary button-wide-mobile button-sm landingButton"
                        >
                          Sign up
                        </Button>
                      </li>
                    </ul>
                  )}
                  {isDemo && (
                    <ul className="list-reset text-xs header-nav-right">
                      <li>
                        <Link to="/demo" onClick={closeMenu}>
                          Home
                        </Link>
                      </li>
                      {user && isAuthenticated && (
                        <li>
                          <Link to="/my-buckets" onClick={closeMenu}>
                            My Buckets
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link to="/create-bucket" onClick={closeMenu}>
                          Create Buckets
                        </Link>
                      </li>
                      {user && isAuthenticated && (
                        <li>
                          <Link to="/home" onClick={closeMenu}>
                            Expert Buckets
                          </Link>
                        </li>
                      )}
                      {user && isAuthenticated && (
                        <li>
                          <Link to="/settings" onClick={closeMenu}>
                            Settings
                          </Link>
                        </li>
                      )}
                      {!user && !isAuthenticated && (
                        <li>
                          <Button
                            tag="a"
                            color="primary"
                            wideMobile
                            href="/login"
                            className="button button-primary button-wide-mobile button-sm landingButton"
                          >
                            Login
                          </Button>
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </nav>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
