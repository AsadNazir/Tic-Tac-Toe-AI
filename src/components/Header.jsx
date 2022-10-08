import React from 'react'
import'../App.css'
export default function Header(props) {
  return (
    <div className='Head'>
      <h1 className='Heading'>Tic Tac Toe</h1>
      <h1 className='Turn'>Turn : <span>{props.turn}</span></h1>
    </div>
  )
}
