import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginPic from "../../Assets/loginpic.jpg";
import MenuIcon from "../../Assets/Icons/menu.png";

import { setNavMenuVisibility } from "../../Redux/Actions/app";
import GoogleLogin from 'react-google-login';
import { googleLogin } from "../../Redux/Actions/auth";
import { insertTokenInHeaders } from "../../Services";
import { encryptDataString, showToast } from "../../Utils";


const Login = (props)=> {
  const dispatch = useDispatch();
  const user = useSelector(state=>state.auth.user);
  const isAuthenticated = useSelector(state=>state.auth.isAuthenticated);

  const handleOnNavMenuClick = () => {
    dispatch(setNavMenuVisibility(true));
  }

  const responseGoogle = (response) => {
    onGoogleLogin(response.profileObj);
  }

  const onGoogleLogin = (userInfo) => {
    const data = {
      email: userInfo.email,
      firstName: userInfo.givenName,
      lastName: userInfo.familyName,
      profilePicture: userInfo.imageUrl
    };
    dispatch(googleLogin(data, (authToken)=>{
      insertTokenInHeaders(authToken);
      const encryptedToken = encryptDataString(authToken);
      localStorage.setItem(
        "bucket_session",
        encryptedToken
      );
      props.history.push("/my-buckets");
    }));
  }

  if(user && isAuthenticated) return <Redirect to="/my-buckets" />;

  return(
    <>
      <div className="p-11" style={{ backgroundImage: `url(${LoginPic})`, height: '100vh', width: '100vw', backgroundSize: 'cover'}}>
        <div className="flex justify-between">
          <h3 className="font-bold text-gray-400 text-4xl">Buckets</h3>
          <div className="flex items-center justify-between">
            <img onClick={handleOnNavMenuClick} className="w-6 h-6 mx-4 cursor-pointer object-contain" src={MenuIcon} />
          </div>
        </div>
        <div className="block sm:block md:flex justify-between mt-6  ">
          <div className="w-full sm:w-full md:w-full lg:w-2/5" >

          </div>
          <div className="w-full sm:w-full md:w-full lg:w-2/5 flex items-center justify-center bg-white " >
            <div>
              <GoogleLogin
                clientId="280304099921-n923fr06n36om9d141neoua4s3p756oi.apps.googleusercontent.com"
                buttonText="Sign in with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                responseType=""
                cookiePolicy={'single_host_origin'}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;