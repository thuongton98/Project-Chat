import React from 'react'
import Peer from 'peerjs'
import io from 'socket.io-client';
import {useState,useRef,useEffect} from 'react'

function Video(){

    const [socket,setsocket] = useState('')
    let  ROOM_ID='123123'
    var videoz = useRef('')
    var videozz=useRef('')

    useEffect(() => {
        const connect= io('http://localhost:5000', { transports: ['websocket', 'polling', 'flashsocket'] })
        setsocket(connect)

        
    }, [])
    
    const myPeer = new Peer({host:'localhost', port:9000, path: '/myapp'})
navigator.mediaDevices.getUserMedia({
    video: false,
    audio: true
}).then(stream => {
   
    addVideoStream(videoz, stream)

    myPeer.on('call', call => {
        call.answer(stream)
        
        call.on('stream', userVideoStream => {
            addVideoStream(videozz, userVideoStream)
        })
    })

    socket.on('user-connected', userId => {
    
        connectToNewUser(userId, stream)
    })
    socket.on('user-disconnected', data=>{
      
     
     
     
    })

})
myPeer.on('open', id => {
const data = {
  ROOM_ID,
  id
}
    if(socket!==''){
        socket.emit('join-room',data)
    }
})

function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream)

    call.on('stream', userVideoStream => {

        addVideoStream(videozz, userVideoStream)
    })
   
}
function addVideoStream(video, stream) {
    
 
    if ('srcObject' in video) {
        video.srcObject = stream
        video.play();
      } else {
        video.src = window.URL.createObjectURL(stream) // for older browsers
        video.play();
      }
   
   
}
    return(
        <section className="p404">
        <h1>test video</h1>
        <video className='video default' autoPlay playsInline ref={ref=>videoz=ref} ></video>
        <video className='video user' autoPlay playsInline ref={ref=>videozz=ref}></video>
      </section>
    )
}

export default Video