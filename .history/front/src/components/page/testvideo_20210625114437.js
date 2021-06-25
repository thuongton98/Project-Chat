import React from 'react'
import {useRef,useState} from 'react'

function Video(){
 const videoref = useRef('')
    navigator.mediaDevices.getUserMedia({
        video:true,
        audio:true
      }).then((stream)=>{
        videoref.srcObject = stream
            // Some more code
      }).catch(err=>{
          alert(err.message)
      })
    return(
        <section className="p404">
        <h1>video test</h1>
        <video ref={ref=>videoref=ref}></video>
      </section>
    )
}

export default Video