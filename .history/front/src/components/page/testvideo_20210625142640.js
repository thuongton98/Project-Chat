import React from 'react'
import io from 'socket.io-client';
import {useState,useRef,useEffect} from 'react'
import Peer from 'peer'

function Video(){
  const [socket,setsocket]=useState(null)
  useEffect(() => {
    const connect= io('http://localhost:5000', { transports: ['websocket', 'polling', 'flashsocket'] })

    setsocket(connect)
}, [])

  const videoGrid = document.getElementById('video-grid')

  const myPeer = new Peer(undefined, {})
  const myVideo = document.createElement('video')
  myVideo.muted = true
  
  navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
  }).then(stream => {
      addVideoStream(myVideo, stream)
  
      myPeer.on('call', call => {
          call.answer(stream)
          const video = document.createElement('video')
          call.on('stream', userVideoStream => {
              addVideoStream(video, userVideoStream)
          })
      })
  
      socket.on('user-connected', userId => {
          connectToNewUser(userId, stream)
      })
      socket.on('user-disconnected', userId => {
          console.log(userId)
      })
  })
  
  myPeer.on('open', id => {
      socket.emit('join-room', ROOM_ID, id)
  })
  
  function connectToNewUser(userId, stream) {
      const call = myPeer.call(userId, stream)
      const video = document.createElement('video')
      call.on('stream', userVideoStream => {
          addVideoStream(video, userVideoStream)
      })
      call.on('close', () => {
          video.remove()
      })
  }
  
  
  function addVideoStream(video, stream) {
      video.srcObject = stream
      video.addEventListener('loadedmetadata', () => {
          video.play()
      })
      videoGrid.append(video)
  }
    return(
        <section className="p404">
        <h1>video</h1>
        <div id="video-grid"></div>
        <video className='video'></video>
      </section>
    )
}

export default Video