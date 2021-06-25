import React from 'react'
import Peer from 'peerjs';

function Video(){
    const peer = new Peer('1234'); 
    const conn = peer.connect('another-peers-id');
conn.on('open', () => {
  conn.send('hi!');
});

    return(
        <section className="p404">
        <h1>video</h1>
        <video className='video'></video>
      </section>
    )
}

export default Video