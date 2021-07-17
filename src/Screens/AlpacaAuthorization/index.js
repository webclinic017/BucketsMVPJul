import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import BarLoader from 'react-spinners/BarLoader';
import { getAlpacaAccessToken } from "../../Redux/Actions/alpaca";
import theme from "../../Theme";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const AlpacaAuthorization = (props) => {
  const dispatch = useDispatch();
  let query = useQuery();

  useEffect(() => {
    const data = {authCode: query.get("code")};
    dispatch(getAlpacaAccessToken(data, ()=>{props.history.push("/my-buckets")}));
  }, []);

  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <div className="flex flex-col justify-center">
        <span className="my-3 text-gray-500">authorizing alpaca...</span>
        <BarLoader height={4} width={150} color={theme.colors.yellow} loading={true} />
      </div>
    </div>
  );
}

export default AlpacaAuthorization;