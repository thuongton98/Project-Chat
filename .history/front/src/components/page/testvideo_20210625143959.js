import React from 'react'

import {useState,useRef,useEffect} from 'react'
import SimpleWebRTC from 'simplewebrtc';

function Video(){

var videoref = useRef('')
var divref = useRef('')

  var webrtc = new SimpleWebRTC({
    // the id/element dom element that will hold "our" video
    localVideoEl: videoref,
    // the id/element dom element that will hold remote videos
    remoteVideosEl: divref,
    // immediately ask for camera access
    autoRequestMedia: true
});



 
  
 
    return(
        <section className="p404">
        <h1>video</h1>
       
        <video ref={ref=>videoref=ref} id="localVideo"></video>
        <div ref={ref=>divref=ref} id="remoteVideos"></div>
      </section>
    )
}

export default Video