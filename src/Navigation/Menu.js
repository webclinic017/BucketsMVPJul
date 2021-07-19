import { slide as Menu } from 'react-burger-menu';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import CloseIcon from "../Assets/Icons/close.png";
import { setNavMenuVisibility } from "../Redux/Actions/app";

const SlideMenu = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isNavMenuVisible = useSelector(state => state.app.isNavMenuVisible);

  const handleOnMenuItemClick = () => {
    dispatch(setNavMenuVisibility(false));
  }
  
  const handleOnClickOpen = () => {
    dispatch(setNavMenuVisibility(true));
  }
  
  const handleOnClickClose = () => {
    dispatch(setNavMenuVisibility(false));
  }

  const handleStateChange = (state) => {
    dispatch(setNavMenuVisibility(state.isOpen));
  }

  return (
    <Menu
      isOpen={isNavMenuVisible} right disableAutoFocus
      className="bg-gray-900"
      onClose={handleOnClickClose}
      onOpen={handleOnClickOpen}
      onStateChange={(state)=>handleStateChange(state)}
    >
      <div className="menu-item pt-2 px-3">
        <img onClick={handleOnClickClose} src={CloseIcon} className="w-5 h-5 bg-white cursor-pointer rounded-full ml-auto" />
      </div>
      <Link
        id="home" to="/"
        onClick={handleOnMenuItemClick}
        className={`menu-item pt-2 text-xl pl-4 ${location.pathname === '/' && 'font-bold'} ${location.pathname === '/' ? 'text-green-600' : 'text-white'}`}
      >Home</Link>
      <Link
        id="your-buckets" to="/my-buckets"
        onClick={handleOnMenuItemClick}
        className={`menu-item pt-4 text-xl pl-4 ${location.pathname === '/my-buckets' && 'font-bold'} ${location.pathname === '/my-buckets' ? 'text-green-600' : 'text-white'}`}
      >My Buckets</Link>
      <Link
        id="create-bucket" to="/create-bucket"
        onClick={handleOnMenuItemClick}
        className={`menu-item pt-4 text-xl pl-4 ${location.pathname === '/create-bucket' && 'font-bold'} ${location.pathname === '/create-bucket' ? 'text-green-600' : 'text-white'}`}
      >Create Bucket</Link>
      <Link
        id="settings" to="/settings"
        onClick={handleOnMenuItemClick}
        className={`menu-item pt-4 text-xl pl-4 ${location.pathname === '/settings' && 'font-bold'} ${location.pathname === '/settings' ? 'text-green-600' : 'text-white'}`}
      >Settings</Link>
    </Menu>
  );
}

export default SlideMenu;