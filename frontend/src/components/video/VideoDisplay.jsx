import React, { useEffect, useReducer, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IoPauseCircleOutline, IoPlayCircleOutline } from "react-icons/io5";
import { MdOutlineArrowLeft, MdOutlineArrowRight } from "react-icons/md";
import { FaExpand, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import VideoBody from "./VideoBody";
import VideoComment from "./VideoComment";



/* ---------------------- REDUCER & INITIAL STATE ---------------------- */

const initialState = {
  isPlaying: false,
  videoCurrentTime: 0,
  videoDuration: 0,
  mute: false,
  volume: 1,
  progress: 0,
};

function videoReducer(state, action) {
  switch (action.type) {
    case "SET_PLAYING":
      return { ...state, isPlaying: action.payload };

    case "SET_VIDEO_CURRENT_TIME":
      return { ...state, videoCurrentTime: action.payload };

    case "SET_VIDEO_DURATION":
      return { ...state, videoDuration: action.payload };

    case "SET_MUTE":
      return { ...state, mute: action.payload };

    case "SET_VOLUME":
      return { ...state, volume: action.payload };

    case "SET_PROGRESS":
      return { ...state, progress: action.payload };

    default:
      return state;
  }
}

/* ----------------------------- COMPONENT ----------------------------- */

const VideoDisplay = () => {
  const { id } = useParams();
  const videoRef = useRef();
  const isSeekingRef = useRef(false); 
  const [video, setVideo] = useState();
  const [state, dispatch] = useReducer(videoReducer, initialState);

  /* ------------------------- FETCH VIDEO ------------------------- */

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/video/play-video/${id}`,
          { withCredentials: true }
        );

        if (response?.data?.success) {
          setVideo(response.data.video);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchVideo();
  }, [id]);

  /* -------------------- PLAY / PAUSE -------------------- */

  const handlePlayPause = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      dispatch({ type: "SET_PLAYING", payload: true });
    } else {
      videoRef.current.pause();
      dispatch({ type: "SET_PLAYING", payload: false });
    }
  };

  /* ------------------ TIME UPDATE FIX ------------------ */

  const handleUpdateTime = () => {
    if (!videoRef.current || isSeekingRef.current) return; // FIX

    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration;

    dispatch({ type: "SET_VIDEO_CURRENT_TIME", payload: current });
    dispatch({
      type: "SET_PROGRESS",
      payload: (current / duration) * 100,
    });
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const load = () =>
      dispatch({ type: "SET_VIDEO_DURATION", payload: v.duration });

    const play = () => dispatch({ type: "SET_PLAYING", payload: true });

    const pause = () => dispatch({ type: "SET_PLAYING", payload: false });

    v.addEventListener("loadedmetadata", load);
    v.addEventListener("play", play);
    v.addEventListener("pause", pause);

    return () => {
      v.removeEventListener("loadedmetadata", load);
      v.removeEventListener("play", play);
      v.removeEventListener("pause", pause);
    };
  }, []);

  /* ------------------------ SEEK FIXED ------------------------ */

  const handleSeekStart = () => {
    isSeekingRef.current = true;
    if (videoRef.current) videoRef.current.pause();
  };

  const handleSeek = (e) => {
    if (!videoRef.current) return;

    const value = Number(e.target.value);

    const seekTime = (value / 100) * state.videoDuration;

    videoRef.current.currentTime = seekTime;

    dispatch({ type: "SET_PROGRESS", payload: value });
  };

  const handleSeekEnd = () => {
    isSeekingRef.current = false;
    if (videoRef.current) videoRef.current.play();
  };

  /* ----------------------- VOLUME ---------------------- */

  const handleVolume = (e) => {
    const vol = parseFloat(e.target.value);

    dispatch({ type: "SET_VOLUME", payload: vol });
    dispatch({ type: "SET_MUTE", payload: vol === 0 });

    if (videoRef.current) videoRef.current.volume = vol;
  };

  const handleMute = () => {
    if (!videoRef.current) return;

    const newMute = !state.mute;

    dispatch({ type: "SET_MUTE", payload: newMute });
    videoRef.current.muted = newMute;
  };

  /* ----------------------- FULLSCREEN ---------------------- */

  const handleFullScreen = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  /* --------------------- FORMAT TIME --------------------- */

  const format = (n) => String(Math.floor(n)).padStart(2, "0");

  const formatTime = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = Math.floor(sec % 60);

    return h > 0
      ? `${format(h)}:${format(m)}:${format(s)}`
      : `${format(m)}:${format(s)}`;
  };

  /* ----------------------- UI START ---------------------- */

  return (
    <div className="bg-black min-h-screen pt-16 px-6 text-white flex gap-6 pb-7">

      <div className="flex-1 bg-gray-800 rounded-lg overflow-hidden">

        {/* Play Video Section */}
        <div className="relative w-full h-[700px] group border-2 border-gray-400 rounded-md">

          <video
            ref={videoRef}
            src={video?.videoUrl}
            className="w-full h-full object-contain bg-black"
            autoPlay
            onTimeUpdate={handleUpdateTime}
          ></video>

          {/* CENTER CONTROLS */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                          flex items-center gap-6 opacity-0 group-hover:opacity-100">

            <MdOutlineArrowLeft
              onClick={() => (videoRef.current.currentTime -= 10)}
              className="cursor-pointer bg-red-500 size-[56px] rounded-full"
            />

            {state.isPlaying ? (
              <IoPauseCircleOutline
                onClick={handlePlayPause}
                className="cursor-pointer bg-red-500 size-[56px] rounded-full p-4"
              />
            ) : (
              <IoPlayCircleOutline
                onClick={handlePlayPause}
                className="cursor-pointer bg-red-500 size-[56px] rounded-full p-4"
              />
            )}

            <MdOutlineArrowRight
              onClick={() => (videoRef.current.currentTime += 10)}
              className="cursor-pointer bg-red-500 size-[56px] rounded-full"
            />
          </div>

          {/* BOTTOM CONTROLS */}
          <div className="absolute bottom-5 left-0 w-full opacity-0 group-hover:opacity-100">

            {/* PROGRESS BAR */}
            <div className="w-full h-1 bg-gray-700 relative rounded">
              
              <input
                type="range"
                min={0}
                max={100}
                value={state.progress}
                onMouseDown={handleSeekStart}
                onChange={handleSeek}
                onMouseUp={handleSeekEnd}
                className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 
                           appearance-none bg-transparent cursor-pointer"
              />

              <div
                className="absolute top-0 left-0 h-1 bg-red-500"
                style={{ width: `${state.progress}%` }}
              ></div>
            </div>

            {/* TIME + VOLUME */}
            <div className="mt-2 flex justify-between items-center px-3 text-2xl">

              <div className="flex items-center gap-5">
                {state.isPlaying ? (
                  <IoPauseCircleOutline
                    onClick={handlePlayPause}
                    className="cursor-pointer bg-red-500 size-[56px] rounded-full p-4"
                  />
                ) : (
                  <IoPlayCircleOutline
                    onClick={handlePlayPause}
                    className="cursor-pointer bg-red-500 size-[56px] rounded-full p-4"
                  />
                )}

                <div className="bg-gray-500/50 px-3 py-1 rounded-full text-xl">
                  {formatTime(state.videoCurrentTime)} /{" "}
                  {formatTime(state.videoDuration)}
                </div>
              </div>

              {/* VOLUME */}
              <div className="flex items-center gap-3">
                <button onClick={handleMute}>
                  {state.mute ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>

                <input
                  type="range"
                  value={state.mute ? 0 : state.volume}
                  onChange={handleVolume}
                  min={0}
                  max={1}
                  step={0.1}
                  className="w-16 accent-red-500"
                />

                <button onClick={handleFullScreen}>
                  <FaExpand />
                </button>
              </div>

            </div>

          </div>

        </div>

{/* Body Section */}
   <div className="px-3 pb-10">
       <VideoBody id={id}/>
   </div>

   {/* comment section */}
   <div className="px-3">
    <VideoComment/>
   </div>


      </div>

   

      <div className="bg-green-500 w-[400px] h-[500px] rounded-lg"></div>
    </div>
  );
};

export default VideoDisplay;
