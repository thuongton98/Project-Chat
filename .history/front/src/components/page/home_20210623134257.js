import React from 'react'
import {useSelector,useEffect} from 'react-redux'


function Home(){
    return(
        <section className="login">
        <div className="login-i">
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" placeholder="nhap username" />
        </div>
        <div className="login-i">
          <label htmlFor="pass">Password: </label>
          <input id="pass" type="password" placeholder="nhap password" />
        </div>
        <div className="login-check">
          <input id="checkbox" type="checkbox" />
          <label htmlFor="checkbox">show password</label>
        </div>
        <input className="submit" type="submit" defaultValue="Login" />
      </section>
    )
}

export default Home