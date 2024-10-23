import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Row from './Row';
import words from './data/five-letter-words.json'
import WinLossPage from './WinLossPage';
import Keyboard from './Keyboard';

function App() {

  type LetterType = {
    value: string,
    color: string
  }
  type RowType = LetterType[]
  type WordleType = RowType[]

  type keyboardColorType = {
    gray: string[]
    yellow: string[]
    green: string[]
  }

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
  const [wordOfToday, setWordOfToday] = useState(localStorage.getItem('wordOfToday') !== null ? String(localStorage.getItem('wordOfToday')) : '')
  const [win, setWin] = useState(localStorage.getItem('win') !== null ? (localStorage.getItem('win') === 'true' ? true : false)  : false)
  const [loss, setLoss] = useState(localStorage.getItem('loss') !== null ? (localStorage.getItem('loss') === 'true' ? true : false) : false)
  const [streak, setStreak] = useState(localStorage.getItem('streak') !== null ? Number(localStorage.getItem('streak')) : 0)
  const [notAWord, setNotAWord] = useState(false)
  const [keyboardColor, setKeyboardColor] = useState<keyboardColorType>(JSON.parse(localStorage.getItem('keyboardColor') || '""') ? JSON.parse(localStorage.getItem('keyboardColor') || '""') : {gray: [], yellow: [], green: []})
  const divRef: React.RefObject<HTMLDivElement> = useRef(null)

  const yellowBackGround = '#c9b458'
  const greenBackGround = '#6aaa64'
  const grayBackGround = '#787c7e'

  useEffect(() => {
    if (divRef && divRef.current){
      divRef.current.focus()
    }
  },[])

  useEffect(() => {
    localStorage.setItem('keyboardColor', JSON.stringify(keyboardColor))
  }, [keyboardColor])

  useEffect(() => {
    if(currentRow > 0){
      setKeyboardColor(() => {
        const yellowButtons = wordleState[currentRow - 1].filter(elem => elem.color === yellowBackGround && !keyboardColor.yellow.find(findElem => findElem.includes(elem.value.toUpperCase()))).map(elem => elem.value.toUpperCase()).join()
        const greenButtons = wordleState[currentRow - 1].filter(elem => elem.color === greenBackGround && !keyboardColor.green.find(findElem => findElem.includes(elem.value.toUpperCase()))).map(elem => elem.value.toUpperCase()).join()
        const grayButtons = wordleState[currentRow - 1].filter(elem => elem.color === grayBackGround && !keyboardColor.gray.find(findElem => findElem.includes(elem.value.toUpperCase()))).map(elem => elem.value.toUpperCase()).join()
        return({
          green: [...keyboardColor.green, greenButtons],
          yellow: [...keyboardColor.yellow, yellowButtons],
          gray: [...keyboardColor.gray, grayButtons],
        })
      })
    }
  },[currentRow])

  useEffect(() => {
    if (localStorage.getItem('wordOfToday') !== wordOfToday || localStorage.getItem('wordOfToday') === null || localStorage.getItem('wordOfToday') === '') {
      setCurrentLetter(0)
      setCurrentRow(0)
      setWordleState(initialState)
      setWin(false)
      setLoss(false)
      setKeyboardColor({gray: [], yellow: [], green: []})
    }
    const dateIndex = (Number(new Date().toLocaleString().split(',')[0].split('.').join('')) + 2)
    setWordOfToday(words[(dateIndex + dateIndex) % words.length].toLowerCase())
    localStorage.setItem('wordOfToday', wordOfToday)
  },[wordOfToday])

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

  useEffect(() => {
    localStorage.setItem('win', String(win))
    localStorage.setItem('loss', String(loss))
  },[win, loss])

  const rowElem = wordleState.map((elem: RowType, index: number) => {
    return(
      <Row data = {elem} index = {index} key={index} notAWord={currentRow === index ? notAWord : false}/>
    )
  })

  function handleInput(e: React.KeyboardEvent<HTMLDivElement>){

    if (win || loss){
      return
    }

    setNotAWord(false)

    // complete row
    if (e.key === 'Enter' && currentLetter === 5){
      let word = ''
      wordleState[currentRow].forEach((elem: LetterType) => {
        word += elem.value  
      })
      if (words.find(elem => elem.toLowerCase() === word)){
        setWordleState(() => {
          let tempWordOfToday = wordOfToday
          return(
            wordleState.map((row: RowType, RowIndex: number) => {
              if (RowIndex === currentRow){
                return row.map((letter, letterIndex) => {
                  if (tempWordOfToday.includes(letter.value)){
                    tempWordOfToday = tempWordOfToday.replace(letter.value, '')
                    if (wordOfToday[letterIndex] === letter.value){
                      return {...letter, color: greenBackGround}
                    }
                    return {...letter, color: yellowBackGround}
                  }
                  return {...letter, color: grayBackGround}
                })
              }
              return row
            })
          )
        })

        setCurrentRow(currentRow + 1)
        setCurrentLetter(0)

        if (word === wordOfToday){
          setWin(true)
          setStreak(streak + 1)
        }
  
        if(currentRow === 5 && word !== wordOfToday){
          setLoss(true)
          setStreak(0)
        }
      }
      else{
        setNotAWord(true)
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
    if (e.key !== 'Enter' && e.key !== 'Backspace' && currentLetter < 5 && Number(e.keyCode) > 64 && Number(e.keyCode) < 91){
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

  function handleClick(e: React.MouseEvent<HTMLButtonElement>){
    const buttonCode = e.currentTarget.innerText

    if (win || loss){
      return
    }

    setNotAWord(false)

    // complete row
    if (buttonCode === 'ENTER' && currentLetter === 5){
      let word = ''
      wordleState[currentRow].forEach((elem: LetterType) => {
        word += elem.value  
      })
      if (words.find(elem => elem.toLowerCase() === word)){
        setWordleState(() => {
          let tempWordOfToday = wordOfToday
          return(
            wordleState.map((row: RowType, RowIndex: number) => {
              if (RowIndex === currentRow){
                return row.map((letter, letterIndex) => {
                  if (tempWordOfToday.includes(letter.value)){
                    tempWordOfToday = tempWordOfToday.replace(letter.value, '')
                    if (wordOfToday[letterIndex] === letter.value){
                      return {...letter, color: greenBackGround}
                    }
                    return {...letter, color: yellowBackGround}
                  }
                  return {...letter, color: grayBackGround}
                })
              }
              return row
            })
          )
        })
        setCurrentRow(currentRow + 1)
        setCurrentLetter(0)

        if (word === wordOfToday){
          setWin(true)
          setStreak(streak + 1)
        }
  
        if(currentRow === 5 && word !== wordOfToday){
          setLoss(true)
          setStreak(0)
        }
      }
      else{
        setNotAWord(true)
      }
    }

    // delete letter
    if (e.currentTarget.className === 'backspace-button' && currentLetter > 0){
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
    if (buttonCode !== 'ENTER' && e.currentTarget.className !== 'backspace-button' && currentLetter < 5){
      setWordleState(() => {
        return(
          wordleState.map((row: RowType, rowIndex: number) => {
            if (rowIndex === currentRow){
              return row.map((letter, letterIndex) => {
                if (letterIndex === currentLetter){
                  return {value: buttonCode.toLowerCase(), color : ''}
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
    <div className="App" onKeyDown={(e) => handleInput(e)} ref={divRef} tabIndex={0}>
      <h1>WORDLE</h1>
      {rowElem}
      {(win || loss) && <WinLossPage streak={streak} win={win} answer={wordOfToday}/>}
      {!(win || loss) && <Keyboard handleCLick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e)} color={keyboardColor}/>}
    </div>
  );
}

export default App;
