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
    
    const [room,setroom] = useState('')
    const [messroom,setmessroom] = useState('')
    
    useEffect(() => {
        const connect= io('http://localhost:5000', { transports: ['websocket', 'polling', 'flashsocket'] })
        connect.on('getuser',data=>{setuser(data)})
       

        connect.on('join_room',data=>{
          setroom(data)
           
           
        })
        connect.on('messroom',data=>{setmessroom(data)})
        connect.on('allmess',data=>{
            const find = data.filter(function(value){
                return value.room_id[0] === 'global' 
            })
           
            
            
           setallmess(find)
        })
       
       
       
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
            const find = e.filter(function(value){
                return value.name === username
            })
            var z
            if(find.length>0){
               z = find[0].name
            }
           
            return(
               <div className='online-i'>
                    <h4>Online:</h4>
                <div className="online">
                   
                    <div onClick={(e)=>setroom('')}>Global</div>
                    {e.map((value,index)=>{
                       if(value.name!==username){
                        return(
                            <div onClick={(e)=>showmess(value.name, z,e)} key={index}>{value.name}</div>
                        )
                       }else{
                           return(
                            <span  key={index}></span>
                           )
                       }
                    })}
                </div>
               </div>
            )
        }
    }
    function showmess(e,v,k){
       k.target.style.backgroundColor ='42bcf5'
       k.target.style.color ='white'
        const add = [
            e,
            v
        ]
       socket.emit('room',add)
     
    }
    if(room!==''){
       
        return(
            <div>
            <section className="chat">
            {showuseronline(user)}
       {showallmess(messroom)}
      
        <form onSubmit={(e)=>submitchatroom(e,room)}>
          <input ref={ref=>messref=ref} onChange={(e)=>setmess(e.target.value)} type="text" placeholder="type ....." />
          <input  onClick={(e)=>submitchatroom(e,room)} className="submit-chat" type="submit" value="Send" />
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
    function submitchat(e,v){
        e.preventDefault();
        messref.value =''
        if(mess===''){
            alert('nhap mess ')
        }else{
            const add ={
                username,
                mess,
                room_id:v,
               
    
            }
            socket.emit("mess",add);
            
            setmess('')
        }
    }
    function submitchatroom(e,v){
        e.preventDefault();
        messref.value =''
        if(mess===''){
            alert('nhap mess ')
        }else{
            const add ={
                username,
                mess,
                room_id:v
    
            }
            socket.emit("messroom",add);
            
            setmess('')
        }
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
  
   if(user.length>0){
       const find = user.filter(function(value){
           return value.name === username
       })
      
      
       
       if(find.length<2){
           return(
            <div>
            <section className="chat">
        {showuseronline(user)}
       {showallmess(allmess)}
        <form onSubmit={(e)=>submitchat(e,'global')}>
          <input ref={ref=>messref=ref} onChange={(e)=>setmess(e.target.value)} type="text" placeholder="type ....." />
          <input  onClick={(e)=>submitchat(e,'global')} className="submit-chat" type="submit" value="Send" />
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
       else{
        
    

        return(
       
            <section className="p404">
            <h1>da co nguoi dang nhap</h1>
            <p>vui long dang nhap lai</p>
            <button onClick={(e)=>window.location.reload()}>Login</button>
          </section>
        )
        
       }
   }
    return(
       
        <section className="p404">
        <h1>Wait...</h1>
        <p>Please Wait a moment</p>
      </section>
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