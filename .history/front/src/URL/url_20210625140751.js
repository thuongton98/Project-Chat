import React from 'react'
import { Switch,Route } from 'react-router'
import home from '../components/page/home'
import p404 from '../components/page/p404'
import test from '../components/page/testvideo'

function URL(){

    return(
        <Switch>
            <Route exact path='/' component={home}/>
            <Route path='/test' component={test}/>



            <Route component={p404}/>
            
        </Switch>
    )
}


export default URL