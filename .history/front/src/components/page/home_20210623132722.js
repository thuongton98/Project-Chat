import React from 'react'



function Home(){
    return(
        <section class="login">
        <div class="login-i">
            <label for="username">Username: </label>
            <input type="text" id="username" placeholder="nhap username">
        </div>
        <div class="login-i">
            <label for="pass">Password: </label>
            <input id="pass" type="password" placeholder="nhap password">
        </div>
       <div class="login-check">
        <input id="checkbox" type="checkbox">
        <label for="checkbox">show password</label>
       </div>
       <input class="submit" type="submit" value="Login">
    </section>
    )
}

export default Home