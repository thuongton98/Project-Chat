import React from 'react'

import {useState,useRef,useEffect} from 'react'
import Peer from 'peerjs';


function Video(){

var videoref = useRef('')
var divref = useRef('')

const myPeer = new Peer({host:'peerjs-server.herokuapp.com', secure:true, port:443})
navigator.mediaDevices.getUserMedia({
    video:false,
    audio: true
}).then(stream => {
   
   

    myPeer.on('call', call => {
        call.answer(stream)
        console.log(stream)
        call.on('stream', userVideoStream => {
           
        })
    })

 
})






  
 
    return(
        <section className="p404">
        <h1>video</h1>
       
        <video ref={ref=>videoref=ref} id="localVideo"></video>
        <div ref={ref=>divref=ref} id="remoteVideos"></div>
      </section>
    )
}

export default Video