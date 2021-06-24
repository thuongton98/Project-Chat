import React from 'react'
import {useSelector,useEffect,useDispatch} from 'react-redux'
import {add,remove} from '../../redux/action'

function Home(){
    const dispatch = useDispatch()

    function addx(e){
        dispatch(add)
    }
    
    const show = useSelector(state=>state.get.value)
    console.log(show)
    
    return(
        <section className="login">
            <button onClick={(e)=>{addx()}}>x</button>
      </section>
    )
}

export default Home