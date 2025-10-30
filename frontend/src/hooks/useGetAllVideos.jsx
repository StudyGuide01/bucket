import React, { useEffect } from 'react';
import axios from 'axios';

const useGetAllVideos = () => {
    useEffect(()=>{
        const getAllVideos = async(req, res)=>{
            try {
                const response = await axios.get('http://localhost:8000/api/v1/video/get-all-videos',{withCredentials:true});
                console.log(response.data);

            } catch (error) {
                console.log("error on hook to get vidoe ", error);

            }
        }
        getAllVideos();
    },[])

}

export default useGetAllVideos