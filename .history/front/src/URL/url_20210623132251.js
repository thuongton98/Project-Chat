import React from 'react'
import { Switch,Route } from 'react-router'
import home from '../components/page/home'

function URL(){

    return(
        <Switch>
            <Route exact path='/' component={home}/>
            <Route component={p404}/>
        </Switch>
    )
}


export default URL