import React from 'react'
import {useRef,useState,useEffect} from 'react'
import io from 'socket.io-client';


function Video(){
 var videoref = useRef('')
 
const [socket,setsocket] = useState('')
      useEffect(() => {
        const connect= io('http://localhost:5000', { transports: ['websocket', 'polling', 'flashsocket'] })
        
       
        setsocket(connect)
    }, [])
    function gotStream(stream) {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        var audioContext = new AudioContext();
        // Create an AudioNode from the stream
        var mediaStreamSource = audioContext.createMediaStreamSource(stream);
        // Connect it to destination to hear yourself
        // or any other node for processing!
        mediaStreamSource.connect(audioContext.destination);
    }
    navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then((stream)=>{
       
            videoref.srcObject = stream
          
       gotStream(stream)
       })
    return(
        <section className="p404">
        <h1>video test</h1>
        <video className='video' ref={ref=>videoref=ref}></video>
      </section>
    )
}

export default Video