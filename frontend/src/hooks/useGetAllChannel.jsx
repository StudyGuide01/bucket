import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setChannel } from "../redux/channelSlice";

const useGetOwnerChannel = (shouldFetch) => {
    const dispatch = useDispatch();
  useEffect(() => {
    try {
        if (!shouldFetch) return;
    const getChannel = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/v1/channel/getChannel",
        { withCredentials: true }
      );
      dispatch(setChannel(response.data?.channel))
     
    };
    getChannel();
    } catch (error) {
        console.log('Error to get owner channel on custom hook function inside hooks');
    }
  }, [shouldFetch]);
};

export default useGetOwnerChannel;
