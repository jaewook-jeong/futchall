import axios from "axios";
import { useDispatch } from "react-redux";
import { backUrl } from "../config/config";
import { LOAD_MY_INFO_SUCCESS } from "../reducers/user";


const getAccessToken = (token) => {
  const dipatch = useDispatch();
  setTimeout(() => {
    // access토큰 재발급
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    axios.get(`${backUrl}/auth/token/expired`)
      .then((data) => {
        dispatch({
          type: LOAD_MY_INFO_SUCCESS,
          data: data.data
        });
      });
  }, 30 * 60 * 1000);
}


export default getAccessToken;