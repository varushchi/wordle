import React from 'react'
import './Letter.css'

interface Props{
  value: string
  color: string
}

export default function Letter(props: Props) {

  const borderColor = props.value === '' ? 'gray' : 'black'
  return (
    <div className='Letter' style={{backgroundColor: props.color, border: `1px solid ${borderColor}`}} >
      {props.value}
    </div>
  )
}
