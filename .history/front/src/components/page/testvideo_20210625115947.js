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

    navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then((stream)=>{
       
            videoref.srcObject = stream
            console.log(stream)
       socket.emit('stream',stream)
       })
    return(
        <section className="p404">
        <h1>video test</h1>
        <video className='video' ref={ref=>videoref=ref}></video>
      </section>
    )
}

export default Video