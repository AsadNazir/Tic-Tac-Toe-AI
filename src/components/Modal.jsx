import React from 'react'
import '../App.css'

export default function Modal(props) {
  function ModeSelect(e) {
    props.setMode(e.target.textContent);
  }

  return (
    <div className={props.mode!='none'?"modalBox disappear":"modalBox"}>
      <h1 className='modalh1'>Play Against Computer and Try to beat it !</h1>
      <div className='btnDiv'>
        <button onClick={ModeSelect}>Easy</button>
        <button onClick={ModeSelect}>Hard</button>
      </div>
    </div>
  )
}
