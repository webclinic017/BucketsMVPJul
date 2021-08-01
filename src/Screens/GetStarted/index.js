import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from "../../Components/Atomic/Button";
import MenuIcon from "../../Assets/Icons/menu.png";
import { setNavMenuVisibility } from "../../Redux/Actions/app";
import RevenueBro1 from "../../Assets/backgrounds/Revenue-bro_1.png";
import YellowCliffLeft from "../../Assets/backgrounds/yellow_cliff_left.png";
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
        <div
          style={{backgroundImage: `url(${YellowCliffLeft})`, backgroundRepeat: "no-repeat", backgroundPosition: "left bottom", backgroundSize: '30% 30%'}}
          className="flex flex-col-reverse sm:flex-col-reverse md:flex-row justify-between h-screen"
        >
          <div className="w-full sm:w-full md:w-full lg:w-2/5 h-full flex items-center justify-center">
            <div className="my-auto w-full sm:w-full md:w-4/5">
              <h1 className="text-3xl text-gray-700 font-bold">Why pay management fees?</h1>
              <p className="text-gray-500 my-4">Buy investment baskets created by you or experts within a few clicks at no cost</p>
              <Link to="/home" >
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;