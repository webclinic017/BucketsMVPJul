import { useDispatch } from 'react-redux';
import MenuIcon from "../../Assets/Icons/menu.png";
import { setNavMenuVisibility } from "../../Redux/Actions/app";
import Button from "../../Components/Atomic/Button";
import {
  logoutUser
} from "../../Redux/Actions/auth";


const Settings = (props)=> {
  const dispatch = useDispatch();

  const handleOnNavMenuClick = () => {
    dispatch(setNavMenuVisibility(true));
  }

  const handleLogout = () => {
    dispatch(logoutUser());
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
            <Button
              title="Logout"
              onClick={handleLogout}
            />
          </div>
          <div className="w-full sm:w-full md:w-full lg:w-2/5">

          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
