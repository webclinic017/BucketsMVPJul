import React, { useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import useClipboard from "react-use-clipboard";
import RightArrow from "../../../../Assets/Icons/right_arrow.png";
import Copy from "../../../../Assets/Icons/copy.png";
import theme from '../../../../Theme';

const ShareBucketPopup = ({open, onClose, ...props}) => {
  const [isCopied, setCopied] = useClipboard("http://buckets-investing.com/bucket/56js9j3559rs95i404", {successDuration: 1000});

  return (
    <Popup overlayStyle={{zIndex: 0}} open={open} onClose={onClose} closeOnDocumentClick position="center" modal>
      <div className="w-full h-full my-12 px-7 rounded-md">
        <h2
          style={{color: theme.colors.lightPurple}}
          className="text-center text-3xl font-bold"
        >Share your masterpiece!</h2>
        <div
          onClick={setCopied}
          style={{
            width: "auto",
            borderWidth: 1,
            backgroundColor: isCopied ? "rgba(90, 229, 70, 0.3)" : "rgba(229, 231, 235)"
          }}
          className="flex items-center justify-center mt-16 mb-4 py-2 px-4 rounded-md cursor-pointer border-gray-400"
        >
          <img className="object-contain h-6 w-6 mx-3" src={RightArrow} />
          <span className="text-center text-gray-600">https://buckets-investing.com/bucket/56js9j3559rs95i404</span>
          <img className="object-contain h-6 w-6 ml-7" src={Copy} />
        </div>
        <h2
          onClick={setCopied}
          style={{color: theme.colors.lightPurple}}
          className="text-center cursor-pointer text-2xl font-bold"
        >{isCopied ? "link copied..." : "copy link"}</h2>
      </div>
    </Popup>
  );
}

export default ShareBucketPopup;
