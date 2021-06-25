import React from 'react'
import io from 'socket.io-client';
import {useState,useRef,useEffect} from 'react'
import SimpleWebRTC from 'simplewebrtc';

function Video(){
  const [socket,setsocket]=useState(null)


  var webrtc = new SimpleWebRTC({
    // the id/element dom element that will hold "our" video
    localVideoEl: 'localVideo',
    // the id/element dom element that will hold remote videos
    remoteVideosEl: 'remoteVideos',
    // immediately ask for camera access
    autoRequestMedia: true
});

  useEffect(() => {
    const connect= io('http://localhost:5000', { transports: ['websocket', 'polling', 'flashsocket'] })

    setsocket(connect)
}, [])

 
  
 
    return(
        <section className="p404">
        <h1>video</h1>
       
        <video id="localVideo"></video>
        <div id="remoteVideos"></div>
      </section>
    )
}

export default Video