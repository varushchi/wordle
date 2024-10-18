import React from 'react'
import './Keyboard.css'

interface Props{
  handleCLick: (e: React.MouseEvent<HTMLButtonElement>) => void
  color: {
    gray: string[]
    yellow: string[]
    green: string[]
  }
}

export default function Keyboard(props: Props) {

  function handleColor(letter: string){
    const yellowBackGround = '#c9b458'
    const greenBackGround = '#6aaa64'
    const grayBackGround = '#787c7e'

   for (let i = 0; i < props.color.green.length; i++){
    if (props.color.green.includes(letter))
      return greenBackGround
   }

   for (let i = 0; i < props.color.yellow.length; i++){
    if (props.color.yellow[i].includes(letter))
      return yellowBackGround
   }

   for (let i = 0; i < props.color.gray.length; i++){
    if (props.color.gray[i].includes(letter))
      return grayBackGround
   }
    return ''
  }

  return (
    <div className='Keyboard'>
      <div className='first-row'>
        <button onClick={(e) => props.handleCLick(e)} style={{backgroundColor: handleColor('Q'), color: handleColor('Q') !== '' ? 'white' : 'black'}}>Q</button>
        <button onClick={(e) => props.handleCLick(e)} style={{backgroundColor: handleColor('W'), color: handleColor('W') !== '' ? 'white' : 'black'}}>W</button>
        <button onClick={(e) => props.handleCLick(e)} style={{backgroundColor: handleColor('E'), color: handleColor('E') !== '' ? 'white' : 'black'}}>E</button>
        <button onClick={(e) => props.handleCLick(e)} style={{backgroundColor: handleColor('R'), color: handleColor('R') !== '' ? 'white' : 'black'}}>R</button>
        <button onClick={(e) => props.handleCLick(e)} style={{backgroundColor: handleColor('T'), color: handleColor('T') !== '' ? 'white' : 'black'}}>T</button>
        <button onClick={(e) => props.handleCLick(e)} style={{backgroundColor: handleColor('Y'), color: handleColor('Y') !== '' ? 'white' : 'black'}}>Y</button>
        <button onClick={(e) => props.handleCLick(e)} style={{backgroundColor: handleColor('U'), color: handleColor('U') !== '' ? 'white' : 'black'}}>U</button>
        <button onClick={(e) => props.handleCLick(e)} style={{backgroundColor: handleColor('I'), color: handleColor('I') !== '' ? 'white' : 'black'}}>I</button>
        <button onClick={(e) => props.handleCLick(e)} style={{backgroundColor: handleColor('O'), color: handleColor('O') !== '' ? 'white' : 'black'}}>O</button>
        <button onClick={(e) => props.handleCLick(e)} style={{backgroundColor: handleColor('P'), color: handleColor('P') !== '' ? 'white' : 'black'}}>P</button>
      </div>
      <div className='second-row'>
        <button onClick={(e) => props.handleCLick(e)} style={{backgroundColor: handleColor('A'), color: handleColor('A') !== '' ? 'white' : 'black'}}>A</button>
        <button onClick={(e) => props.handleCLick(e)} style={{backgroundColor: handleColor('S'), color: handleColor('S') !== '' ? 'white' : 'black'}}>S</button>
        <button onClick={(e) => props.handleCLick(e)} style={{backgroundColor: handleColor('D'), color: handleColor('D') !== '' ? 'white' : 'black'}}>D</button>
        <button onClick={(e) => props.handleCLick(e)} style={{backgroundColor: handleColor('F'), color: handleColor('F') !== '' ? 'white' : 'black'}}>F</button>
        <button onClick={(e) => props.handleCLick(e)} style={{backgroundColor: handleColor('G'), color: handleColor('G') !== '' ? 'white' : 'black'}}>G</button>
        <button onClick={(e) => props.handleCLick(e)} style={{backgroundColor: handleColor('H'), color: handleColor('H') !== '' ? 'white' : 'black'}}>H</button>
        <button onClick={(e) => props.handleCLick(e)} style={{backgroundColor: handleColor('J'), color: handleColor('J') !== '' ? 'white' : 'black'}}>J</button>
        <button onClick={(e) => props.handleCLick(e)} style={{backgroundColor: handleColor('K'), color: handleColor('K') !== '' ? 'white' : 'black'}}>K</button>
        <button onClick={(e) => props.handleCLick(e)} style={{backgroundColor: handleColor('L'), color: handleColor('L') !== '' ? 'white' : 'black'}}>L</button>
      </div>
      <div className='third-row'>
        <button onClick={(e) => props.handleCLick(e)} className='enter-button'>ENTER</button>
        <button onClick={(e) => props.handleCLick(e)} style={{backgroundColor: handleColor('Z'), color: handleColor('Z') !== '' ? 'white' : 'black'}}>Z</button>
        <button onClick={(e) => props.handleCLick(e)} style={{backgroundColor: handleColor('X'), color: handleColor('X') !== '' ? 'white' : 'black'}}>X</button>
        <button onClick={(e) => props.handleCLick(e)} style={{backgroundColor: handleColor('C'), color: handleColor('C') !== '' ? 'white' : 'black'}}>C</button>
        <button onClick={(e) => props.handleCLick(e)} style={{backgroundColor: handleColor('V'), color: handleColor('V') !== '' ? 'white' : 'black'}}>V</button>
        <button onClick={(e) => props.handleCLick(e)} style={{backgroundColor: handleColor('B'), color: handleColor('B') !== '' ? 'white' : 'black'}}>B</button>
        <button onClick={(e) => props.handleCLick(e)} style={{backgroundColor: handleColor('N'), color: handleColor('N') !== '' ? 'white' : 'black'}}>N</button>
        <button onClick={(e) => props.handleCLick(e)} style={{backgroundColor: handleColor('M'), color: handleColor('M') !== '' ? 'white' : 'black'}}>M</button>
        <button onClick={(e) => props.handleCLick(e)} className='backspace-button'>&#9003;</button>
      </div>
    </div>
  )
}
