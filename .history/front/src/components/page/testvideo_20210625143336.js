import React from 'react'
import io from 'socket.io-client';
import {useState,useRef,useEffect} from 'react'


function Video(){
  const [socket,setsocket]=useState(null)
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