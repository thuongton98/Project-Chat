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
    const videoGrid = document.getElementById('video-grid') // Find the Video-Grid element

const myPeer = new Peer() // Creating a peer element which represents the current user
const myVideo = document.createElement('video') // Create a new video tag to show our video
myVideo.muted = true // Mute ourselves on our end so there is no feedback loop
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).then(stream => {
        addVideoStream(myVideo, stream) // Display our video to ourselves
    
        myPeer.on('call', call => { // When we join someone's room we will receive a call from them
            call.answer(stream) // Stream them our video/audio
            const video = document.createElement('video') // Create a video tag for them
            call.on('stream', userVideoStream => { // When we recieve their stream
                addVideoStream(video, userVideoStream) // Display their video to ourselves
            })
        })
    
        socket.on('user-connected', userId => { // If a new user connect
            connectToNewUser(userId, stream) 
        })
    })
    
    myPeer.on('open', id => { // When we first open the app, have us join a room
        socket.emit('join-room', ROOM_ID, id)
    })
    
    function connectToNewUser(userId, stream) { // This runs when someone joins our room
        const call = myPeer.call(userId, stream) // Call the user who just joined
        // Add their video
        const video = document.createElement('video') 
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
        // If they leave, remove their video
        call.on('close', () => {
            video.remove()
        })
    }
    
    
    function addVideoStream(video, stream) {
        video.srcObject = stream 
        video.addEventListener('loadedmetadata', () => { // Play the video as it loads
            video.play()
        })
        videoGrid.append(video) // Append video element to videoGrid
    }

    return(
        <section className="p404">
        <h1>video test</h1>
        <video className='video' ref={ref=>videoref=ref}></video>
      </section>
    )
}

export default Video