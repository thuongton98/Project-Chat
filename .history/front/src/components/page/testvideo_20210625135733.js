import React from 'react'
import {useRef,useState,useEffect} from 'react'
import io from 'socket.io-client';
import Peer from 'simple-peer'

function Video(){
 var videoref = useRef('')
 

 // get video/voice stream


const [socket,setsocket] = useState('')
      useEffect(() => {
        const connect= io('http://localhost:5000', { transports: ['websocket', 'polling', 'flashsocket'] })
        
       
        setsocket(connect)
    }, [])
    
    // get video/voice stream
navigator.mediaDevices.getUserMedia({
    video: false,
    audio: true
  }).then(gotMedia).catch(() => {})
  function gotMedia (stream) {
    var peer1 = new Peer({ initiator: true, stream: stream })
    var peer2 = new Peer()
  
    peer1.on('signal', data => {
      peer2.signal(data)
    })
  
    peer2.on('signal', data => {
      peer1.signal(data)
    })
  
    peer2.on('stream', stream => {
      // got remote video stream, now let's show it in a video tag
      var video = document.querySelector('video')
  
      if ('srcObject' in video) {
        video.srcObject = stream
      } else {
        video.src = window.URL.createObjectURL(stream) // for older browsers
      }
  
      video.play()
    })
  }

    return(
        <section className="p404">
        <h1>video test</h1>
        <video className='video' ref={ref=>videoref=ref}></video>
      </section>
    )
}

export default Video