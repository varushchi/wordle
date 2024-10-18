import React from 'react'
import Letter from './Letter';
import './Row.css'

interface Props{
  data: {
    value: string
    color: string
  }[]
  index: number
  notAWord: boolean
}

export default function Row(props: Props) {

  const letterElem = props.data.map((elem, index) => {
    return (
      <Letter value = {elem.value} color={elem.color} key={index}/>
    )
  })


  return (
    <div className={`Row ${props.notAWord && 'not-a-word'}`}>
      {letterElem}
    </div>
  )
}
