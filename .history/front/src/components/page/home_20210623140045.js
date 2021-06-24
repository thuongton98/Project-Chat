import React from 'react'
import io from 'socket.io-client';
import {useRef} from 'react'

function Home(){
    const socket= io('http://localhost:5000', { transports: ['websocket', 'polling', 'flashsocket'] })
    
    var checkref = useRef('')

    function showpass(){
        if(checkref.type==='password'){
            checkref.type ='text'
        }else{
            checkref.type = 'password'
        }
    }

    return(
        <section className="login">
        <div className="login-i">
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" placeholder="nhap username" />
        </div>
        <div className="login-i">
          <label htmlFor="pass">Password: </label>
          <input ref={ref=>checkref=ref} id="pass" type="password" placeholder="nhap password" />
        </div>
        <div className="login-check">
          <input onClick={(e)=>{showpass(e)}} id="checkbox" type="checkbox" />
          <label htmlFor="checkbox">show password</label>
        </div>
        <input className="submit" type="submit" defaultValue="Login" />
      </section>
    )
}

export default Home