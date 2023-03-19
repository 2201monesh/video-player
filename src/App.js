import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import video from './Untitled.mp4'
import { AiFillCaretLeft } from "react-icons/ai";
import { AiOutlinePause } from "react-icons/ai";
import { AiOutlineUndo } from "react-icons/ai";
import { AiOutlineRedo } from "react-icons/ai";
import { AiFillInfoCircle } from "react-icons/ai";
import { BiSliderAlt } from "react-icons/bi";


import './index.css';

function App() {
  const [playing, setPlaying] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);

  const playerRef = useRef(null);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleProgress = state => {
    setPlayedSeconds(state.playedSeconds);
    setTotalSeconds(state.loadedSeconds);
    setLoaded(state.loaded);
  };

  const handleSpeedChange = () => {
    const currentRate = playbackRate;
    setPlaybackRate(currentRate === 2.0 ? 1.0 : currentRate + 0.5);
  };

  const handleSkip = seconds => {
    playerRef.current.seekTo(playedSeconds + seconds);
  };

  return (
    <div className="container">
      <div className="player-wrapper">
        <ReactPlayer
          ref={playerRef}
          url={video}
          width="100%"
          height="100%"
          playing={playing}
          playbackRate={playbackRate}
          onProgress={handleProgress}
        />
      </div>

      <div className='progress' >
       <div className="progress-bar-wrapper">
        <div className="progress-bar" style={{ width: `${(playedSeconds / totalSeconds) * 100}%` }}></div>
        <div className="loaded-bar" style={{ width: `${loaded * 100}%` }}></div>
       </div>

       <div className="time-wrapper">
          <span>{new Date(playedSeconds * 1000).toISOString().substr(11, 8)}</span>
       </div>
      </div>

      <div className="controls-wrapper">

       <div className="controls-wrapper-left">
         <div className="settings">
          <BiSliderAlt className="settings-icon" />
          <span className='text'>Settings</span>
         </div>
         
         <div className="controls-wrapper-play-pause">
          <button className='skip' onClick={() => handleSkip(-10)}><AiOutlineUndo/></button>
          <button className='play-pause-button' onClick={handlePlayPause}>{playing ? <AiOutlinePause/> : <AiFillCaretLeft/>}</button>
          <button className='skip' onClick={() => handleSkip(10)}><AiOutlineRedo/></button>
         </div>
       </div>

       <div className="controls-wrapper-right">
        <div className="controls-wrapper-right-1">
         <div className="duration">
          <div className="time-wrapper">
           <span>{new Date(playedSeconds * 1000).toISOString().substr(11, 8)}</span>
          </div>
         </div>
         <button className='speed-button' onClick={handleSpeedChange}> {playbackRate}x</button>
        </div>
        <div className="shortcuts">
         <AiFillInfoCircle className='shortcut-icon'/>
         <span className='text'>Shortcuts</span>
        </div>
       </div>

      </div>
    </div>
  );
}

export default App;

