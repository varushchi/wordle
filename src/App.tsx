import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Row from './Row';
import words from './data/5-letter-words.json'

function App() {

  const initialState = [
    [{value: '', color: ''},{value: '', color: ''},{value: '', color: ''},{value: '', color: ''},{value: '', color: ''}],
    [{value: '', color: ''},{value: '', color: ''},{value: '', color: ''},{value: '', color: ''},{value: '', color: ''}],
    [{value: '', color: ''},{value: '', color: ''},{value: '', color: ''},{value: '', color: ''},{value: '', color: ''}],
    [{value: '', color: ''},{value: '', color: ''},{value: '', color: ''},{value: '', color: ''},{value: '', color: ''}],
    [{value: '', color: ''},{value: '', color: ''},{value: '', color: ''},{value: '', color: ''},{value: '', color: ''}],
    [{value: '', color: ''},{value: '', color: ''},{value: '', color: ''},{value: '', color: ''},{value: '', color: ''}],
  ]

  const [wordleState, setWordleState] = useState(initialState)
  const [currentLetter, setCurrentLetter] = useState(0)
  const [currentRow, setCurrentRow] = useState(0)
  const [wordOfToday, setWordOfToday] = useState('')

  useEffect(() => {
    setWordOfToday(words[(Number(new Date().toISOString().split('T')[0].split('-').join(''))) % words.length])
  },[])

  console.log('answer', wordOfToday)

  const rowElem = wordleState.map((elem, index) => {
    return(
      <Row data = {elem} index = {index} key={index}/>
    )
  })

  function handleInput(e: React.KeyboardEvent<HTMLDivElement>){
    // complete row
    if (e.key === 'Enter' && currentLetter === 5){

      let word = ''
      wordleState[currentRow].forEach(elem => {
        word += elem.value  
      })

      if (words.find(elem => elem === word)){
        setWordleState(() => {
          let tempWordOfToday = wordOfToday
          return(
            wordleState.map((row, RowIndex) => {
              if (RowIndex === currentRow){
                return row.map((letter, letterIndex) => {
                  if (tempWordOfToday.includes(letter.value)){
                    tempWordOfToday = tempWordOfToday.replace(letter.value, '')
                    if (wordOfToday[letterIndex] === letter.value){
                      return {...letter, color: 'green'}
                    }
                    return {...letter, color: 'yellow'}
                  }
                  return {...letter, color: 'gray'}
                })
              }
              return row
            })
          )
        })
        setCurrentRow(currentRow + 1)
        setCurrentLetter(0)
      }
      else{
        alert('not a word')
      }

      if (word === wordOfToday){
        alert('You win')
      }
    }

    // delete letter
    if (e.key === 'Backspace' && currentLetter > 0){
      setWordleState(() => {
        return(
          wordleState.map((row, rowIndex) => {
            if (rowIndex === currentRow){
              return row.map((letter, letterIndex) => {
                if (letterIndex === currentLetter - 1){
                  return {value: '', color: ''}
                }
                return letter
              })
              
            }
            return row
          })
        )
      })
      setCurrentLetter(currentLetter - 1)
    }


    // write letter
    if (e.key !== 'Enter' && e.key !== 'Backspace' && currentLetter < 5 && currentRow < 6 && e.key !== 'Alt' && e.key !== 'Tab'){
      setWordleState(() => {
        return(
          wordleState.map((row, rowIndex) => {
            if (rowIndex === currentRow){
              return row.map((letter, letterIndex) => {
                if (letterIndex === currentLetter){
                  return {value: e.key, color : ''}
                }
                return letter
              })
            }
            return row
          })
        )
      })
      setCurrentLetter(currentLetter + 1)
    }
  }

  return (
    <div className="App" onKeyDown={(e) => handleInput(e)} tabIndex={0}>
      <h1>WORDLE</h1>
      {rowElem}
    </div>
  );
}

export default App;
