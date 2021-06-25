import React from 'react'
import {useRef,useState} from 'react'

function Video(){
 var videoref = useRef('')
 navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then((stream)=>{
       videoref.srcObject = stream
            
      })
    return(
        <section className="p404">
        <h1>video test</h1>
        <video className='video' ref={ref=>videoref=ref}></video>
      </section>
    )
}

export default Video