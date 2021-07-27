import { useDispatch } from 'react-redux';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import Button from "../../Components/Atomic/Button";
import ArrowDownCircle from "../../Assets/Icons/arrow_down_circle.png";
import MenuIcon from "../../Assets/Icons/menu.png";
import { setNavMenuVisibility } from "../../Redux/Actions/app";
import RevenueBro1 from "../../Assets/backgrounds/Revenue-bro_1.png";
import YellowCliff from "../../Assets/backgrounds/yellow_cliff.png";
import Welcome from "../../Assets/backgrounds/Welcome.png";
import Yoga from "../../Assets/backgrounds/Yoga_Relax.png";
import Victory from "../../Assets/backgrounds/Victory.png";
import Science from "../../Assets/backgrounds/Science.png";
import Finances from "../../Assets/backgrounds/Finances.png";
import theme from '../../Theme';

const Homepage = (props)=> {
  const dispatch = useDispatch();

  const handleOnNavMenuClick = () => {
    dispatch(setNavMenuVisibility(true));
  }

  return(
    <>
      <div className="h-screen">
        <div className="flex px-11 py-6 w-full justify-between fixed">
          <h3 className="font-bold text-gray-400 text-4xl">Buckets</h3>
          <div className="flex items-center justify-between">
            <img onClick={handleOnNavMenuClick} className="w-6 h-6 mx-4 cursor-pointer object-contain" src={MenuIcon} />
          </div>
        </div>
        <Element name="section1" className="element">
          <div
            style={{backgroundImage: `url(${YellowCliff})`, backgroundRepeat: "no-repeat", backgroundPosition: "left bottom", backgroundSize: '30% 30%'}}
            className="flex flex-col-reverse sm:flex-col-reverse md:flex-row justify-between h-screen"
          >
            <div className="w-full sm:w-full md:w-full lg:w-2/5 h-full flex items-center justify-center">
              <div className="my-auto w-full sm:w-full md:w-4/5">
                <h1 className="text-3xl text-gray-700 font-bold">Why pay management fees?</h1>
                <p className="text-gray-500 my-4">Buy investment baskets created by you or experts within a few clicks at no cost</p>
                <Link activeClass="active" to="section2" spy={true} smooth={true} offset={0} duration={500} delay={300}>
                  <Button
                    title="Explore"
                    styles={{
                      backgroundColor: theme.colors.red,
                      borderColor: theme.colors.red,
                      boxShadow: theme.shadows.red
                    }}
                    className="ml-6"
                  />
                </Link>
              </div>
            </div>
            <div style={{backgroundImage: `url(${RevenueBro1})`, backgroundPosition: "center", height: '100%', backgroundRepeat: "no-repeat", backgroundSize: 'contain'}} className="w-full sm:w-full md:w-full lg:w-3/6 flex items-end">
              <Link activeClass="active" to="section2" spy={true} smooth={true} offset={0} duration={500} delay={300}>
                <img src={ArrowDownCircle} className="w-8 h-8 mb-8 cursor-pointer" />
              </Link>
            </div>
          </div>
        </Element>
        <Element name="section2" className="element">
          <div
            style={{backgroundImage: `url(${YellowCliff})`, backgroundRepeat: "no-repeat", backgroundPosition: "left bottom", backgroundSize: '30% 30%'}}
            className="flex flex-col-reverse sm:flex-col-reverse md:flex-row justify-between h-screen"
          >
            <div className="w-full sm:w-full md:w-full lg:w-2/5 h-full flex items-center justify-center">
              <div className="my-auto w-full sm:w-full md:w-4/5">
                <h1 className="text-3xl text-gray-700 font-bold">By Theme</h1>
                <p className="text-gray-500 my-4">Blockchain, AI,  Renewable Energy and more ...</p>
                <Button
                  title="Browse"
                  styles={{
                    backgroundColor: theme.colors.red,
                    borderColor: theme.colors.red,
                    boxShadow: theme.shadows.red
                  }}
                  className="ml-6"
                />
              </div>
            </div>
            <div style={{backgroundImage: `url(${Welcome})`, backgroundPosition: "center", height: '100%', backgroundRepeat: "no-repeat", backgroundSize: 'contain'}} className="w-full sm:w-full md:w-full lg:w-3/6 flex items-end">
              <Link activeClass="active" to="section3" spy={true} smooth={true} offset={0} duration={500} delay={300}>
                <img src={ArrowDownCircle} className="w-8 h-8 mb-8 cursor-pointer" />
              </Link>
            </div>
          </div>
        </Element>
        <Element name="section3" className="element">
          <div
            style={{backgroundImage: `url(${YellowCliff})`, backgroundRepeat: "no-repeat", backgroundPosition: "left bottom", backgroundSize: '30% 30%'}}
            className="flex flex-col-reverse sm:flex-col-reverse md:flex-row justify-between h-screen"
          >
            <div className="w-full sm:w-full md:w-full lg:w-2/5 h-full flex items-center justify-center">
              <div className="my-auto w-full sm:w-full md:w-4/5">
                <h1 className="text-3xl text-gray-700 font-bold">General Investing</h1>
                <p className="text-gray-500 my-4">Put your money on autopilot while you focus on the rest</p>
                <Button
                  title="Browse"
                  styles={{
                    backgroundColor: theme.colors.red,
                    borderColor: theme.colors.red,
                    boxShadow: theme.shadows.red
                  }}
                  className="ml-6"
                />
              </div>
            </div>
            <div style={{backgroundImage: `url(${Yoga})`, backgroundPosition: "center", height: '100%', backgroundRepeat: "no-repeat", backgroundSize: 'contain'}} className="w-full sm:w-full md:w-full lg:w-3/6 flex items-end">
              <Link activeClass="active" to="section4" spy={true} smooth={true} offset={0} duration={500} delay={300}>
                <img src={ArrowDownCircle} className="w-8 h-8 mb-8 cursor-pointer" />
              </Link>
            </div>
          </div>
        </Element>
        <Element name="section4" className="element">
          <div
            style={{backgroundImage: `url(${YellowCliff})`, backgroundRepeat: "no-repeat", backgroundPosition: "left bottom", backgroundSize: '30% 30%'}}
            className="flex flex-col-reverse sm:flex-col-reverse md:flex-row justify-between h-screen"
          >
            <div className="w-full sm:w-full md:w-full lg:w-2/5 h-full flex items-center justify-center">
              <div className="my-auto w-full sm:w-full md:w-4/5">
                <h1 className="text-3xl text-gray-700 font-bold">Retirement Planning</h1>
                <p className="text-gray-500 my-4">High dividend yielding and target retirement buckets</p>
                <Button
                  title="Browse"
                  styles={{
                    backgroundColor: theme.colors.red,
                    borderColor: theme.colors.red,
                    boxShadow: theme.shadows.red
                  }}
                  className="ml-6"
                />
              </div>
            </div>
            <div style={{backgroundImage: `url(${Victory})`, backgroundPosition: "center", height: '100%', backgroundRepeat: "no-repeat", backgroundSize: 'contain'}} className="w-full sm:w-full md:w-full lg:w-3/6 flex items-end">
              <Link activeClass="active" to="section5" spy={true} smooth={true} offset={0} duration={500} delay={300}>
                <img src={ArrowDownCircle} className="w-8 h-8 mb-8 cursor-pointer" />
              </Link>
            </div>
          </div>
        </Element>
        <Element name="section5" className="element">
          <div
            style={{backgroundImage: `url(${YellowCliff})`, backgroundRepeat: "no-repeat", backgroundPosition: "left bottom", backgroundSize: '30% 30%'}}
            className="flex flex-col-reverse sm:flex-col-reverse md:flex-row justify-between h-screen"
          >
            <div className="w-full sm:w-full md:w-full lg:w-2/5 h-full flex items-center justify-center">
              <div className="my-auto w-full sm:w-full md:w-4/5">
                <h1 className="text-3xl text-gray-700 font-bold">Advanced Strategies</h1>
                <p className="text-gray-500 my-4">Smart Beta/Volatility and more</p>
                <Button
                  title="Browse"
                  styles={{
                    backgroundColor: theme.colors.red,
                    borderColor: theme.colors.red,
                    boxShadow: theme.shadows.red
                  }}
                  className="ml-6"
                />
              </div>
            </div>
            <div style={{backgroundImage: `url(${Science})`, backgroundPosition: "center", height: '100%', backgroundRepeat: "no-repeat", backgroundSize: 'contain'}} className="w-full sm:w-full md:w-full lg:w-3/6 flex items-end">
              <Link activeClass="active" to="section6" spy={true} smooth={true} offset={0} duration={500} delay={300}>
                <img src={ArrowDownCircle} className="w-8 h-8 mb-8 cursor-pointer" />
              </Link>
            </div>
          </div>
        </Element>
        <Element name="section6" className="element">
          <div
            style={{backgroundImage: `url(${YellowCliff})`, backgroundRepeat: "no-repeat", backgroundPosition: "left bottom", backgroundSize: '30% 30%'}}
            className="flex flex-col-reverse sm:flex-col-reverse md:flex-row justify-between h-screen"
          >
            <div className="w-full sm:w-full md:w-full lg:w-2/5 h-full flex items-center justify-center">
              <div className="my-auto w-full sm:w-full md:w-4/5">
                <h1 className="text-3xl text-gray-700 font-bold">Create Your Own</h1>
                <p className="text-gray-500 my-4">Create your own investment bucket and share it!</p>
                <Button
                  title="Create"
                  styles={{
                    backgroundColor: theme.colors.red,
                    borderColor: theme.colors.red,
                    boxShadow: theme.shadows.red
                  }}
                  className="ml-6"
                />
              </div>
            </div>
            <div style={{backgroundImage: `url(${Finances})`, backgroundPosition: "center", height: '100%', backgroundRepeat: "no-repeat", backgroundSize: 'contain'}} className="w-full sm:w-full md:w-full lg:w-3/6 flex items-end">
              <Link activeClass="active" to="section1" spy={true} smooth={true} offset={0} duration={1500} delay={300}>
                <img src={ArrowDownCircle} className="rotateImg180 w-8 h-8 mb-8 cursor-pointer" />
              </Link>
            </div>
          </div>
        </Element>
      </div>
    </>
  );
}

export default Homepage;