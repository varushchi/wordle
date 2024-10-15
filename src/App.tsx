import React, { useEffect, useState } from 'react';
import './App.css';
import Row from './Row';
import words from './data/5-letter-words.json'
import WinLossPage from './WinLossPage';

function App() {

  type LetterType = {
    value: string,
    color: string
  }
  type RowType = LetterType[]
  type WordleType = RowType[]

  const initialState = [
    [{value: '', color: ''},{value: '', color: ''},{value: '', color: ''},{value: '', color: ''},{value: '', color: ''}],
    [{value: '', color: ''},{value: '', color: ''},{value: '', color: ''},{value: '', color: ''},{value: '', color: ''}],
    [{value: '', color: ''},{value: '', color: ''},{value: '', color: ''},{value: '', color: ''},{value: '', color: ''}],
    [{value: '', color: ''},{value: '', color: ''},{value: '', color: ''},{value: '', color: ''},{value: '', color: ''}],
    [{value: '', color: ''},{value: '', color: ''},{value: '', color: ''},{value: '', color: ''},{value: '', color: ''}],
    [{value: '', color: ''},{value: '', color: ''},{value: '', color: ''},{value: '', color: ''},{value: '', color: ''}],
  ]

  const [wordleState, setWordleState] = useState<WordleType>(JSON.parse(localStorage.getItem('wordleState') || '""') ? JSON.parse(localStorage.getItem('wordleState') || '""') : initialState)
  const [currentLetter, setCurrentLetter] = useState(localStorage.getItem('currentLetter') !== null ? Number(localStorage.getItem('currentLetter')) : 0)
  const [currentRow, setCurrentRow] = useState(localStorage.getItem('currentRow') !== null ? Number(localStorage.getItem('currentRow')) : 0)
  const [wordOfToday, setWordOfToday] = useState('')
  const [win, setWin] = useState(localStorage.getItem('win') !== null ? Boolean(localStorage.getItem('win')) : false)
  const [loss, setLoss] = useState(localStorage.getItem('loss') !== null ? Boolean(localStorage.getItem('loss')) : false)
  const [streak, setStreak] = useState(localStorage.getItem('streak') !== null ? Number(localStorage.getItem('streak')) : 0)

  useEffect(() => {
    setWordOfToday(words[(Number(new Date().toISOString().split('T')[0].split('-').join(''))) % words.length])
  },[])

  useEffect(() => {
    localStorage.setItem('wordleState', JSON.stringify(wordleState))
  },[wordleState])

  useEffect(() => {
    localStorage.setItem('currentLetter', String(currentLetter))
  },[currentLetter])

  useEffect(() => {
    localStorage.setItem('currentRow', String(currentRow))
  },[currentRow])

  useEffect(() => {
    localStorage.setItem('streak', String(streak))
  },[streak])

  const rowElem = wordleState.map((elem: RowType, index: number) => {
    return(
      <Row data = {elem} index = {index} key={index}/>
    )
  })

  function handleInput(e: React.KeyboardEvent<HTMLDivElement>){

    if (win || loss){
      return
    }
    // complete row
    if (e.key === 'Enter' && currentLetter === 5){
      let word = ''
      wordleState[currentRow].forEach((elem: LetterType) => {
        word += elem.value  
      })
      if (words.find(elem => elem === word)){
        setWordleState(() => {
          let tempWordOfToday = wordOfToday
          return(
            wordleState.map((row: RowType, RowIndex: number) => {
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
        setWin(true)
        setStreak(streak + 1)
        localStorage.setItem('win', String(win))
      }

      if(currentRow === 5){
        setLoss(true)
        setStreak(0)
        localStorage.setItem('loss', String(loss))
      }
    }

    // delete letter
    if (e.key === 'Backspace' && currentLetter > 0){
      setWordleState(() => {
        return(
          wordleState.map((row: RowType, rowIndex: number) => {
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
          wordleState.map((row: RowType, rowIndex: number) => {
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

  console.log(streak, Number(localStorage.getItem('streak')))

  return (
    <div className="App" onKeyDown={(e) => handleInput(e)} tabIndex={0}>
      <h1>WORDLE</h1>
      {rowElem}
      {(win || loss) && <WinLossPage streak={streak} win={win} answer={wordOfToday}/>}
    </div>
  );
}

export default App;
