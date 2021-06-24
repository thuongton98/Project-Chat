import React from 'react'
import io from 'socket.io-client';
import {useState,useRef} from 'react'

function Home(){
    const socket= io('http://localhost:5000', { transports: ['websocket', 'polling', 'flashsocket'] })
    
    var checkref = useRef('')
    const [username,setusername] = useState('')
    const [pass,setpass] = useState('')

    function showpass(){
        if(checkref.type==='password'){
            checkref.type ='text'
        }else{
            checkref.type = 'password'
        }
    }
    function submit(e){
        e.preventDefault();
        const add ={
            username,
            pass
        }
        console.log(add)
    }

    return(
        <section className="login">
        <div className="login-i">
          <label htmlFor="username">Username: </label>
          <input onChange={(e)=>setusername(e.target.value)} type="text" id="username" placeholder="nhap username" />
        </div>
        <div className="login-i">
          <label htmlFor="pass">Password: </label>
          <input onChange={(e)=>setpass(e.target.value)} ref={ref=>checkref=ref} id="pass" type="password" placeholder="nhap password" />
        </div>
        <div className="login-check">
          <input onClick={(e)=>{showpass(e)}} id="checkbox" type="checkbox" />
          <label htmlFor="checkbox">show password</label>
        </div>
        <input onClick={(e)=>{submit(e)}} className="submit" type="submit" defaultValue="Login" />
      </section>
    )
}

export default Home