import { useDispatch } from 'react-redux';
import { Link as RSLink, Element } from 'react-scroll';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from "../../Components/Atomic/Button";
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
import theme from '../../Theme';
import {Helmet} from "react-helmet";

const Homepage = (props)=> {
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleOnNavMenuClick = () => {
    dispatch(setNavMenuVisibility(true));
  }

  return(
    <>
      <div className="h-screen">
        <Helmet>
          <title>Home - Browse Portfolios</title>
          <meta name="description" content="Browse and buy pre-made portfolios. Portfolios made by expert investors. Whether you are planning for retirement, looking for a low volatility strategy or general investing, this is the place to start."/>
        </Helmet>
        <div className="flex px-11 py-6 w-full justify-between fixed">
          <h3 className="text-5xl text-gray-700 font-bold">Buckets</h3>
          <div className="flex items-center justify-between">
            <img onClick={handleOnNavMenuClick} className="w-6 h-6 mx-4 cursor-pointer object-contain" src={MenuIcon} />
          </div>
        </div>
        <Element name="section1" className="element">
          <div
            style={{ backgroundRepeat: "no-repeat", backgroundPosition: "right bottom", backgroundSize: '30% 30%'}}
            className="flex flex-col sm:flex-col md:flex-row justify-between h-screen"
          >
            <div style={{backgroundImage: `url(${Welcome})`, backgroundPosition: "center", height: '100%', backgroundRepeat: "no-repeat", backgroundSize: 'contain'}} className="w-full sm:w-full md:w-full lg:w-3/6 flex flex-col items-end justify-end">
              <RSLink activeClass="active" to="section2" spy={true} smooth={true} offset={0} duration={500} delay={300}>
                <img src={ArrowDownCircle} className="w-8 h-8 mb-8 cursor-pointer" />
              </RSLink>
            </div>
            <div className="w-full sm:w-full md:w-full lg:w-2/5 h-full flex items-center justify-center">
              <div className="my-auto w-full sm:w-full md:w-4/5">
                <h1 className="text-5xl text-gray-700 font-bold">By Theme</h1>
                <p className="text-3xl text-gray-500 my-4">Blockchain, AI,  Renewable Energy and more ...</p>
                <Link to={{pathname: "/browse", state: {type: "theme"}}}>
                  <Button
                    title="Browse"
                    styles={{
                      backgroundColor: theme.colors.tuscany,
                      borderColor: theme.colors.tuscany,
                      boxShadow: theme.shadows.tuscany
                    }}
                    className="ml-6 "
                  />
                </Link>
              </div>
            </div>
          </div>
        </Element>
        <Element name="section2" className="element">
          <div
            style={{ backgroundRepeat: "no-repeat", backgroundPosition: "left bottom", backgroundSize: '30% 30%'}}
            className="flex flex-col-reverse sm:flex-col-reverse md:flex-row justify-between h-screen"
          >
            <div className="w-full sm:w-full md:w-full lg:w-2/5 h-full flex items-center justify-center">
              <div className="my-auto w-full sm:w-full md:w-4/5">
                <h1 className="text-5xl text-gray-700 font-bold">General Investing</h1>
                <p className="text-3xl text-gray-500 my-4">Put your money on autopilot while you focus on the rest</p>
                <Link to={{pathname: "/browse", state: {type: "general investing"}}}>
                  <Button
                    title="Browse"
                    styles={{
                      backgroundColor: theme.colors.tuscany,
                      borderColor: theme.colors.tuscany,
                      boxShadow: theme.shadows.tuscany
                    }}
                    className="ml-6"
                  />
                </Link>
              </div>
            </div>
            <div style={{backgroundImage: `url(${Yoga})`, backgroundPosition: "center", height: '100%', backgroundRepeat: "no-repeat", backgroundSize: 'contain'}} className="w-full sm:w-full md:w-full lg:w-3/6 flex items-end">
              <RSLink activeClass="active" to="section3" spy={true} smooth={true} offset={0} duration={500} delay={300}>
                <img src={ArrowDownCircle} className="w-8 h-8 mb-8 cursor-pointer" />
              </RSLink>
            </div>
          </div>
        </Element>
        <Element name="section3" className="element">
          <div
            style={{ backgroundRepeat: "no-repeat", backgroundPosition: "right bottom", backgroundSize: '30% 30%'}}
            className="flex flex-col sm:flex-col md:flex-row justify-between h-screen"
          >
            <div style={{backgroundImage: `url(${Victory})`, backgroundPosition: "center", height: '100%', backgroundRepeat: "no-repeat", backgroundSize: 'contain'}} className="w-full sm:w-full md:w-full lg:w-3/6 flex flex-col items-end justify-end">
              <RSLink activeClass="active" to="section4" spy={true} smooth={true} offset={0} duration={500} delay={300}>
                <img src={ArrowDownCircle} className="w-8 h-8 mb-8 cursor-pointer" />
              </RSLink>
            </div>
            <div className="w-full sm:w-full md:w-full lg:w-2/5 h-full flex items-center justify-center">
              <div className="my-auto w-full sm:w-full md:w-4/5">
                <h1 className="text-5xl text-gray-700 font-bold">Retirement Planning</h1>
                <p className="text-3xl text-gray-500 my-4">High dividend yielding and target retirement buckets</p>
                <Link to={{pathname: "/browse", state: {type: "retirement planning"}}}>
                  <Button
                    title="Browse"
                    styles={{
                      backgroundColor: theme.colors.tuscany,
                      borderColor: theme.colors.tuscany,
                      boxShadow: theme.shadows.tuscany
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
            style={{ backgroundRepeat: "no-repeat", backgroundPosition: "left bottom", backgroundSize: '30% 30%'}}
            className="flex flex-col-reverse sm:flex-col-reverse md:flex-row justify-between h-screen"
          >
            <div className="w-full sm:w-full md:w-full lg:w-2/5 h-full flex items-center justify-center">
              <div className="my-auto w-full sm:w-full md:w-4/5">
                <h1 className="text-5xl text-gray-700 font-bold">Advanced Strategies</h1>
                <p className="text-3xl text-gray-500 my-4">Smart Beta/Volatility and more</p>
                <Link to={{pathname: "/browse", state: {type: "advanced strategies"}}}>
                  <Button
                    title="Browse"
                    styles={{
                      backgroundColor: theme.colors.tuscany,
                      borderColor: theme.colors.tuscany,
                      boxShadow: theme.shadows.tuscany
                    }}
                    className="ml-6"
                  />
                </Link>
              </div>
            </div>
            <div style={{backgroundImage: `url(${Science})`, backgroundPosition: "center", height: '100%', backgroundRepeat: "no-repeat", backgroundSize: 'contain'}} className="w-full sm:w-full md:w-full lg:w-3/6 flex items-end">
              <RSLink activeClass="active" to="section5" spy={true} smooth={true} offset={0} duration={500} delay={300}>
                <img src={ArrowDownCircle} className="w-8 h-8 mb-8 cursor-pointer" />
              </RSLink>
            </div>
          </div>
        </Element>
        <Element name="section5" className="element">
          <div
            style={{ backgroundRepeat: "no-repeat", backgroundPosition: "right bottom", backgroundSize: '30% 30%'}}
            className="flex flex-col sm:flex-col md:flex-row justify-between h-screen"
          >
            <div style={{backgroundImage: `url(${Finances})`, backgroundPosition: "center", height: '100%', backgroundRepeat: "no-repeat", backgroundSize: 'contain'}} className="w-full sm:w-full md:w-full lg:w-3/6 flex flex-col items-end justify-end">
              <RSLink activeClass="active" to="section1" spy={true} smooth={true} offset={0} duration={1500} delay={300}>
                <img src={ArrowDownCircle} className="rotateImg180 w-8 h-8 mb-8 cursor-pointer" />
              </RSLink>
            </div>
            <div className="w-full sm:w-full md:w-full lg:w-2/5 h-full flex items-center justify-center">
              <div className="my-auto w-full sm:w-full md:w-4/5">
                <h1 className="text-5xl text-gray-700 font-bold">Create Your Own</h1>
                <p className="text-3xl text-gray-500 my-4">Create your own investment bucket and share it!</p>
                <Link to="/create-bucket">
                  <Button
                    title="Create"
                    styles={{
                      backgroundColor: theme.colors.tuscany,
                      borderColor: theme.colors.tuscany,
                      boxShadow: theme.shadows.tuscany
                    }}
                    className="ml-6"
                  />
                </Link>
              </div>
            </div>
          </div>
        </Element>
      </div>
    </>
  );
}

export default Homepage;
