import React from 'react'

import {useState,useRef,useEffect} from 'react'
import Peer from 'peerjs';


function Video(){

var videoref = useRef('')
var divref = useRef('')


const peer = new Peer('123'); 
const conn = peer.connect('123');
conn.on('open', () => {
  conn.send('hi!');
});


peer.on('connection', (conn) => {
  conn.on('data', (data) => {
    // Will print 'hi!'
    console.log(data);
  });
  conn.on('open', () => {
    conn.send('hello!');
  });
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