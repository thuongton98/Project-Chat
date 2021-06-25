import React from 'react'
import Peer from 'peerjs';

function Video(){
    const peer = new Peer('1234'); 
    const conn = peer.connect('another-peers-id');
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
        <video className='video'></video>
      </section>
    )
}

export default Video