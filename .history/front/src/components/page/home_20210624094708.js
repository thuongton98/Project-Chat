import React from 'react'
import io from 'socket.io-client';
import {useState,useRef,useEffect} from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';

function Home(){
   
    
    var checkref = useRef('')
    var messref = useRef('')
    const [username,setusername] = useState('')
    const [pass,setpass] = useState('')
    const [ok,setok] = useState('')
    const [user,setuser] = useState('')
    const [mess,setmess] = useState('')
    const [allmess,setallmess] = useState('')
    const [socket,setsocket]=useState(null)
    useEffect(() => {
        const connect= io('http://localhost:5000', { transports: ['websocket', 'polling', 'flashsocket'] })
        connect.on('getuser',data=>{setuser(data)})
        connect.on('allmess',data=>{setallmess(data)})
       
        setsocket(connect)
    }, [])

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
                socket.emit("user",add);
                setok('ok')
            
            
         
        
       
       
    }
    function showuseronline(e){
        if(e.length>0){
            return(
                <div className="online">
                    {e.map((value,index)=>{
                       if(value.name!==username){
                        return(
                            <div key={index}>{value.name}</div>
                        )
                       }
                    })}
                </div>
            )
        }
    }
    function submitchat(e){
        e.preventDefault();
        messref.value =''
        const add ={
            username,
            mess

        }
        socket.emit("mess",add);
        
    }
    function showallmess(e){
       
        if(e.length<1){
           return(
            <div className="chat-i">

            </div>
           )
        }else{
            return(
                <ScrollToBottom  className="chat-i">
                    {e.map((value,index)=>{
                       if(value.name === username){
                        return(
                            <p className='right' key ={index}>{value.mess} <b>: {value.name}</b></p>
                        )
                       }else{
                        return(
                            <p key ={index}><b>{value.name} :</b> {value.mess}</p>
                        )
                       }
                    })}
                </ScrollToBottom>
               ) 
        }
    }
   

if(ok!==''){
    console.log(user)
    return(
       <div>
            <section className="chat">
        {showuseronline(user)}
       {showallmess(allmess)}
        <form onSubmit={(e)=>submitchat(e)}>
          <input ref={ref=>messref=ref} onChange={(e)=>setmess(e.target.value)} type="text" placeholder="type ....." />
          <input  onClick={(e)=>submitchat(e)} className="submit-chat" type="submit" defaultValue="submit" />
        </form>
      </section>
      <footer>
      <div className='copyright'>
            <p>&copy; <a href='https://www.facebook.com/ton.that.thuong.98'>Thuong</a></p>
        </div>
      </footer>
       </div>
    )
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
        <div className='copyright'>
            <p>&copy; <a href='https://www.facebook.com/ton.that.thuong.98'>Thuong</a></p>
        </div>
      </section>
    )
}

export default Home