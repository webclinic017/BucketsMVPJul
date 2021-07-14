import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const ShareBucketPopup = ({trigger, ...props})=>{

  return (
    <Popup trigger={trigger} position="center" modal>
      <div>Popup content here !!</div>
    </Popup>
  );
}

export default ShareBucketPopup;
