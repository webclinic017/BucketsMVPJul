import { useDispatch } from 'react-redux';
import MenuIcon from "../../Assets/Icons/menu.png";
import { setNavMenuVisibility } from "../../Redux/Actions/app";

const Homepage = (props)=> {
  const dispatch = useDispatch();

  const handleOnNavMenuClick = () => {
    dispatch(setNavMenuVisibility(true));
  }

  return(
    <>
      <div className="p-11">
        <div className="flex justify-between">
          <h3 className="font-bold text-gray-400 text-4xl">Buckets</h3>
          <div className="flex items-center justify-between">
            <img onClick={handleOnNavMenuClick} className="w-6 h-6 mx-4 cursor-pointer object-contain" src={MenuIcon} />
          </div>
        </div>
        <div className="block sm:block md:flex justify-between mt-6">
          <div className="w-full sm:w-full md:w-full lg:w-2/5 ">
            
          </div>
          <div className="w-full sm:w-full md:w-full lg:w-2/5">
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;