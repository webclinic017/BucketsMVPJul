import React, { useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import GoogleLogin from 'react-google-login';
import HearEyesEmoji from "../../../../Assets/emoji_heart_eyes.png"
import theme from '../../../../Theme';

const GoogleLoginPopup = ({open, onClose, onGoogleLogin, ...props}) => {
  const responseGoogle = (response) => {
    onClose();
    onGoogleLogin(response.profileObj);
  }

  return (
    <Popup open={open} onClose={onClose} closeOnDocumentClick position="center" modal>
      <div className="flex flex-col items-center w-full h-full my-12 px-7 rounded-md">
        <img className="object-contain h-6 w-6 mx-3" src={HearEyesEmoji} />
        <h2
          style={{color: theme.colors.lightPurple}}
          className="text-center text-3xl font-bold"
        >Congrats on creating a bucket!</h2>
        <div
          className="flex items-center justify-center mt-16 mb-4"
        >
          <GoogleLogin
            clientId="280304099921-n923fr06n36om9d141neoua4s3p756oi.apps.googleusercontent.com"
            buttonText="Sign in with Google"
            onSuccess={responseGoogle}
            onFailure={()=>console.log("An error occurred while logging in with google!")}
            responseType=""
            cookiePolicy={'single_host_origin'}
          />
        </div>
        <h2
          style={{color: theme.colors.lightPurple}}
          className="text-center cursor-pointer text-2xl font-bold"
        >to save and share buckets</h2>
      </div>
    </Popup>
  );
}

export default GoogleLoginPopup;
