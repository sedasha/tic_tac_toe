import { findByLabelText } from '@testing-library/react'
import React from 'react'
import O from './O.png'
import X from './X.png'
import './style.scss'


function ChildComponent({ChangeState, id, title, Winner, winner}) {
  
    console.log(winner)
    return (
        <div className="oneCube" onClick={()=>ChangeState(id)}>
            {title !==""? title==='O'?<img className= "img" src={O}/>: <img className= "img" src={X}/>:""
            }
        </div>
    )
}

export default ChildComponent
