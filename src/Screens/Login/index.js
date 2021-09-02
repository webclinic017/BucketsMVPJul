import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginPic from "../../Assets/loginpic.jpg";
import MenuIcon from "../../Assets/Icons/menu.png";
import gif1 from "../../Assets/gifs/finalgif.gif";

import { setNavMenuVisibility } from "../../Redux/Actions/app";
import GoogleLogin from 'react-google-login';
import { googleLogin } from "../../Redux/Actions/auth";
import { insertTokenInHeaders } from "../../Services";
import { encryptDataString } from "../../Utils";


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

  return(
    <>
      <div className="bg-acapulco-500"> 
      <div className="flex bg-acapulco-500">
        <div className="p-11 w-2/3 bg-acapulco-500" style={{ backgroundImage: `url(${gif1})`, height: '50vh', backgroundSize: 'cover'}}>
          <h3 className="text-5xl text-gray-700 font-bold">Buckets</h3>
        </div>
        <div className="p-11 w-1/3 bg-acapulco-500" >
          <div className="flex items-center justify-end bg-acapulco-500">
            <img onClick={handleOnNavMenuClick} className="w-6 h-6 mx-4 cursor-pointer object-contain" src={MenuIcon} />
          </div>
          <div className="bg-acapulco-500 flex h-full justify-center align-center">
            <div className="my-auto bg-acapulco-500">
              <GoogleLogin
                  clientId="331803921206-00bmrs4p2qrbldscela5lv18nk5n849m.apps.googleusercontent.com"
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
      
      
      </div>
      
    </>
  );
}

export default Login;
