import { useState } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import Board from './components/Board'
import './App.css'

function App() {

  const [turn, setTurn] = useState("O");
  const [mode, setMode] = useState("none");

  return (
    <div className="App">
      <Modal setMode={setMode} mode={mode}/>
      <main className={mode=='none'?`Main notVisible`:""} >
        <Header turn={turn} />
        <Board className={mode=='none'?`notVisible`:""} turn={turn} setTurn={setTurn} mode={mode} setMode={setMode}/>
      </main>
    </div>
  )
}

export default App
