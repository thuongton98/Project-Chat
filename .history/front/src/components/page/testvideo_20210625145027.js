import React from 'react'

import {useState,useRef,useEffect} from 'react'



function Video(){

var videoref = useRef('')
var divref = useRef('')






  
 
    return(
        <section className="p404">
        <h1>video</h1>
       
        <video ref={ref=>videoref=ref} id="localVideo"></video>
        <div ref={ref=>divref=ref} id="remoteVideos"></div>
      </section>
    )
}

export default Video