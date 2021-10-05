import { useDispatch } from "react-redux";
import { Link as RSLink, Element } from "react-scroll";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../Components/elements/Button";
import ArrowDownCircle from "../../Assets/Icons/arrow_down_circle.png";
import MenuIcon from "../../Assets/Icons/menu.png";
import { setNavMenuVisibility } from "../../Redux/Actions/app";
import YellowCliffLeft from "../../Assets/backgrounds/yellow_cliff_left.png";
import YellowCliffRight from "../../Assets/backgrounds/yellow_cliff_right.png";
import Welcome from "../../Assets/backgrounds/Welcome.png";
import Yoga from "../../Assets/backgrounds/Yoga_Relax.png";
import Victory from "../../Assets/backgrounds/Victory.png";
import Science from "../../Assets/backgrounds/Science.png";
import Finances from "../../Assets/backgrounds/Finances.png";
import theme from "../../Theme";
import { Helmet } from "react-helmet";
import SmoothList from "react-smooth-list";
import { ChatWidget } from "@papercups-io/chat-widget";
import Header from "../../Components/layout/Header";
import Footer from "../../Components/layout/Footer";
import classNames from "classnames";
import Image from "../../Components/elements/Image";

const Homepage = (
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
) => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleOnNavMenuClick = () => {
    dispatch(setNavMenuVisibility(true));
  };
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
  return (
    <>
      <div className="h-screen">
        <Helmet>
          <title>Home - Browse Portfolios</title>
          <meta
            name="description"
            content="Browse and buy pre-made portfolios. Portfolios made by expert investors. Whether you are planning for retirement, looking for a low volatility strategy or general investing, this is the place to start."
          />
        </Helmet>
        {/* <div className="flex px-11 py-6 w-full justify-between fixed">
          <h3 className="text-5xl text-gray-700 font-bold">Buckets</h3>
          <div className="flex items-center justify-between">
            <img
              onClick={handleOnNavMenuClick}
              className="w-6 h-6 mx-4 cursor-pointer object-contain"
              src={MenuIcon}
            />
          </div>
        </div> */}
        <div className="landing">
          <Header isDemo={true} />
          <div className=" container about">
            <div className={innerClasses}>
              <div className={splitClasses}>
                <div className="split-item">
                  <div
                    className="split-item-content center-content-mobile reveal-from-right"
                    data-reveal-container=".split-item"
                  >
                    <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                      By Theme
                    </div>
                    <h3 className="mt-0 mb-12">
                      Blockchain, AI, Renewable Energy and more ...
                    </h3>
                    <Link
                      to={{ pathname: "/browse", state: { type: "theme" } }}
                    >
                      <Button
                        tag="a"
                        color="primary"
                        wideMobile
                        className="button button-primary button-wide-mobile button-sm landingButton"
                      >
                        Browse
                      </Button>
                    </Link>
                  </div>
                  <div
                    className={classNames(
                      "split-item-image center-content-mobile reveal-from-bottom",
                      imageFill && "split-item-image-fill"
                    )}
                    data-reveal-container=".split-item"
                  >
                    <Image
                      src={require("../../Assets/images/iphone1.png").default}
                      alt="Buckets Investing Teams"
                      className="aboutImage"
                    />
                  </div>
                </div>
                <div className="split-item">
                  <div
                    className="split-item-content center-content-mobile reveal-from-right"
                    data-reveal-container=".split-item"
                  >
                    <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                      General Investing
                    </div>
                    <h3 className="mt-0 mb-12">
                      Put your money on autopilot while you focus on the rest
                    </h3>
                    <Link
                      to={{
                        pathname: "/browse",
                        state: { type: "general investing" },
                      }}
                    >
                      <Button
                        tag="a"
                        color="primary"
                        wideMobile
                        className="button button-primary button-wide-mobile button-sm landingButton"
                      >
                        Browse
                      </Button>
                    </Link>
                  </div>
                  <div
                    className={classNames(
                      "split-item-image center-content-mobile reveal-from-bottom",
                      imageFill && "split-item-image-fill"
                    )}
                    data-reveal-container=".split-item"
                  >
                    <Image
                      src={require("../../Assets/images/iphone1.png").default}
                      alt="Buckets Investing Teams"
                      className="aboutImage"
                    />
                  </div>
                </div>
                <div className="split-item">
                  <div
                    className="split-item-content center-content-mobile reveal-from-right"
                    data-reveal-container=".split-item"
                  >
                    <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                      Retirement Planning
                    </div>
                    <h3 className="mt-0 mb-12">
                      High dividend yielding and target retirement buckets
                    </h3>
                    <Link
                      to={{
                        pathname: "/browse",
                        state: { type: "retirement planning" },
                      }}
                    >
                      <Button
                        tag="a"
                        color="primary"
                        wideMobile
                        className="button button-primary button-wide-mobile button-sm landingButton"
                      >
                        Browse
                      </Button>
                    </Link>
                  </div>
                  <div
                    className={classNames(
                      "split-item-image center-content-mobile reveal-from-bottom",
                      imageFill && "split-item-image-fill"
                    )}
                    data-reveal-container=".split-item"
                  >
                    <Image
                      src={require("../../Assets/images/iphone1.png").default}
                      alt="Buckets Investing Teams"
                      className="aboutImage"
                    />
                  </div>
                </div>
                <div className="split-item">
                  <div
                    className="split-item-content center-content-mobile reveal-from-right"
                    data-reveal-container=".split-item"
                  >
                    <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                      Advanced Strategies
                    </div>
                    <h3 className="mt-0 mb-12">
                      Smart Beta / Volatility and more
                    </h3>
                    <Link
                      to={{
                        pathname: "/browse",
                        state: { type: "advanced strategies" },
                      }}
                    >
                      <Button
                        tag="a"
                        color="primary"
                        wideMobile
                        className="button button-primary button-wide-mobile button-sm landingButton"
                      >
                        Browse
                      </Button>
                    </Link>
                  </div>
                  <div
                    className={classNames(
                      "split-item-image center-content-mobile reveal-from-bottom",
                      imageFill && "split-item-image-fill"
                    )}
                    data-reveal-container=".split-item"
                  >
                    <Image
                      src={require("../../Assets/images/iphone1.png").default}
                      alt="Buckets Investing Teams"
                      className="aboutImage"
                    />
                  </div>
                </div>
                <div className="split-item">
                  <div
                    className="split-item-content center-content-mobile reveal-from-right"
                    data-reveal-container=".split-item"
                  >
                    <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                      Create Your Own
                    </div>
                    <h3 className="mt-0 mb-12">
                      Create your own investment bucket and share it!
                    </h3>
                    <Link to="/create-bucket">
                      <Button
                        tag="a"
                        color="primary"
                        wideMobile
                        className="button button-primary button-wide-mobile button-sm landingButton"
                      >
                        Create
                      </Button>
                    </Link>
                  </div>
                  <div
                    className={classNames(
                      "split-item-image center-content-mobile reveal-from-bottom",
                      imageFill && "split-item-image-fill"
                    )}
                    data-reveal-container=".split-item"
                  >
                    <Image
                      src={require("../../Assets/images/iphone1.png").default}
                      alt="Buckets Investing Teams"
                      className="aboutImage"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="commonBackGround">
          <SmoothList>
            <Element name="section1" className="element">
              <div
                style={{
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right bottom",
                  backgroundSize: "30% 30%",
                }}
                className="flex flex-col sm:flex-col md:flex-row justify-between h-screen"
              >
                <div
                  style={{
                    backgroundImage: `url(${Welcome})`,
                    backgroundPosition: "center",
                    height: "100%",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                  }}
                  className="w-full sm:w-full md:w-full lg:w-3/6 mx-4 flex flex-col items-end justify-end"
                >
                  <RSLink
                    activeClass="active"
                    to="section2"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={500}
                    delay={300}
                  ></RSLink>
                </div>
                <div className="w-full sm:w-full md:w-full lg:w-2/5 h-full flex items-center justify-center">
                  <div className="my-auto mx-4 w-full sm:w-full md:w-4/5">
                    <h1 className="text-5xl text-gray-700 font-bold">
                      By Theme
                    </h1>
                    <p className="text-3xl text-gray-500 my-4">
                      Blockchain, AI, Renewable Energy and more ...
                    </p>
                    <Link
                      to={{ pathname: "/browse", state: { type: "theme" } }}
                    >
                      <Button
                        title="Browse"
                        styles={{
                          backgroundColor: theme.colors.tuscany,
                          borderColor: theme.colors.tuscany,
                          boxShadow: theme.shadows.tuscany,
                        }}
                        className="ml-6 "
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </Element>
          </SmoothList>
          <SmoothList>
            <Element name="section2" className="element">
              <div
                style={{
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left bottom",
                  backgroundSize: "30% 30%",
                }}
                className="flex flex-col-reverse sm:flex-col-reverse md:flex-row justify-between mx-4 h-screen"
              >
                <div className="w-full sm:w-full md:w-full lg:w-2/5 h-full flex items-center justify-center">
                  <div className="my-auto mx-4 w-full sm:w-full md:w-4/5">
                    <h1 className="text-5xl text-gray-700 font-bold">
                      General Investing
                    </h1>
                    <p className="text-3xl text-gray-500 my-4">
                      Put your money on autopilot while you focus on the rest
                    </p>
                    <Link
                      to={{
                        pathname: "/browse",
                        state: { type: "general investing" },
                      }}
                    >
                      <Button
                        title="Browse"
                        styles={{
                          backgroundColor: theme.colors.tuscany,
                          borderColor: theme.colors.tuscany,
                          boxShadow: theme.shadows.tuscany,
                        }}
                        className="ml-6"
                      />
                    </Link>
                  </div>
                </div>
                <div
                  style={{
                    backgroundImage: `url(${Yoga})`,
                    backgroundPosition: "center",
                    height: "100%",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                  }}
                  className="w-full sm:w-full md:w-full lg:w-3/6 mx-4 flex items-end"
                >
                  <RSLink
                    activeClass="active"
                    to="section3"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={500}
                    delay={300}
                  ></RSLink>
                </div>
              </div>
            </Element>
          </SmoothList>
          <Element name="section3" className="element">
            <div
              style={{
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right bottom",
                backgroundSize: "30% 30%",
              }}
              className="flex flex-col sm:flex-col md:flex-row justify-between h-screen"
            >
              <div
                style={{
                  backgroundImage: `url(${Victory})`,
                  backgroundPosition: "center",
                  height: "100%",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                }}
                className="w-full sm:w-full md:w-full lg:w-3/6 flex mx-4 flex-col items-end justify-end"
              >
                <RSLink
                  activeClass="active"
                  to="section4"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                  delay={300}
                ></RSLink>
              </div>
              <div className="w-full sm:w-full md:w-full lg:w-2/5 h-full flex items-center justify-center">
                <div className="my-auto mx-4 w-full sm:w-full md:w-4/5">
                  <h1 className="text-5xl text-gray-700 font-bold">
                    Retirement Planning
                  </h1>
                  <p className="text-3xl text-gray-500 my-4">
                    High dividend yielding and target retirement buckets
                  </p>
                  <Link
                    to={{
                      pathname: "/browse",
                      state: { type: "retirement planning" },
                    }}
                  >
                    <Button
                      title="Browse"
                      styles={{
                        backgroundColor: theme.colors.tuscany,
                        borderColor: theme.colors.tuscany,
                        boxShadow: theme.shadows.tuscany,
                      }}
                      className="ml-6"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </Element>
          <Element name="section4" className="element">
            <div
              style={{
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left bottom",
                backgroundSize: "30% 30%",
              }}
              className="flex flex-col-reverse sm:flex-col-reverse md:flex-row justify-between h-screen"
            >
              <div className="w-full sm:w-full md:w-full lg:w-2/5 h-full flex items-center justify-center">
                <div className="my-auto mx-4 w-full sm:w-full md:w-4/5">
                  <h1 className="text-5xl text-gray-700 font-bold">
                    Advanced Strategies
                  </h1>
                  <p className="text-3xl text-gray-500 my-4">
                    Smart Beta/Volatility and more
                  </p>
                  <Link
                    to={{
                      pathname: "/browse",
                      state: { type: "advanced strategies" },
                    }}
                  >
                    <Button
                      title="Browse"
                      styles={{
                        backgroundColor: theme.colors.tuscany,
                        borderColor: theme.colors.tuscany,
                        boxShadow: theme.shadows.tuscany,
                      }}
                      className="ml-6"
                    />
                  </Link>
                </div>
              </div>
              <div
                style={{
                  backgroundImage: `url(${Science})`,
                  backgroundPosition: "center",
                  height: "100%",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                }}
                className="w-full sm:w-full md:w-full lg:w-3/6 mx-4 flex items-end"
              >
                <RSLink
                  activeClass="active"
                  to="section5"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                  delay={300}
                ></RSLink>
              </div>
            </div>
          </Element>
          <Element name="section5" className="element">
            <div
              style={{
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right bottom",
                backgroundSize: "30% 30%",
              }}
              className="flex flex-col sm:flex-col md:flex-row justify-between h-screen"
            >
              <div
                style={{
                  backgroundImage: `url(${Finances})`,
                  backgroundPosition: "center",
                  height: "100%",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                }}
                className="w-full sm:w-full md:w-full lg:w-3/6 flex flex-col items-end justify-end"
              >
                <RSLink
                  activeClass="active"
                  to="section1"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={1500}
                  delay={300}
                ></RSLink>
              </div>
              <div className="w-full sm:w-full md:w-full lg:w-2/5 h-full flex items-center justify-center">
                <div className="my-auto mx-4 w-full sm:w-full md:w-4/5">
                  <h1 className="text-5xl text-gray-700 font-bold">
                    Create Your Own
                  </h1>
                  <p className="text-3xl text-gray-500 my-4">
                    Create your own investment bucket and share it!
                  </p>
                  <Link to="/create-bucket">
                    <Button
                      title="Create"
                      styles={{
                        backgroundColor: theme.colors.tuscany,
                        borderColor: theme.colors.tuscany,
                        boxShadow: theme.shadows.tuscany,
                      }}
                      className="ml-6"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </Element>
        </div> */}
        <div className="landing">
          <Footer />
        </div>
      </div>
      <ChatWidget
        accountId="00add59e-ee51-4788-b40a-371df7820b23"
        title="Welcome to Buckets Investing"
        subtitle="What's the #1 thing we could do to improve Buckets for you? 😊"
        primaryColor="#7eb5a6"
        greeting=""
        awayMessage=""
        newMessagePlaceholder="Start typing..."
        showAgentAvailability={false}
        agentAvailableText="We're online right now!"
        agentUnavailableText="We're away at the moment."
        requireEmailUpfront={false}
        iconVariant="outlined"
        baseUrl="https://app.papercups.io"
        // Optionally include data about your customer here to identify them
        // customer={{
        //   name: __CUSTOMER__.name,
        //   email: __CUSTOMER__.email,
        //   external_id: __CUSTOMER__.id,
        //   metadata: {
        //     plan: "premium"
        //   }
        // }}
      />
    </>
  );
};

export default Homepage;
