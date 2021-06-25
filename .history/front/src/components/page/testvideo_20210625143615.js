import React from 'react'

import {useState,useRef,useEffect} from 'react'
import SimpleWebRTC from 'simplewebrtc';

function Video(){



  var webrtc = new SimpleWebRTC({
    // the id/element dom element that will hold "our" video
    localVideoEl: 'localVideo',
    // the id/element dom element that will hold remote videos
    remoteVideosEl: 'remoteVideos',
    // immediately ask for camera access
    autoRequestMedia: true
});



 
  
 
    return(
        <section className="p404">
        <h1>video</h1>
       
        <video id="localVideo"></video>
        <div id="remoteVideos"></div>
      </section>
    )
}

export default Video