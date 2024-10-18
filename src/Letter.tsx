import React from 'react'
import './Letter.css'

interface Props{
  value: string
  color: string
}

export default function Letter(props: Props) {

  const grayWithoutValue = '#d3d6da'
  const grayWithValue = '#878a8c'

  const borderColor = props.value === '' ? grayWithoutValue : grayWithValue
  return (
    <div
      className={`Letter ${props.value && 'added-new'} ${props.color && 'row-completed'}`}
      style={{
        backgroundColor: props.color,
        border: `${props.color ? 'none' : `2px solid ${borderColor}`}`,
        width: `${props.color ? '54px' : '52px'}`,
        height: `${props.color ? '54px' : '52px'}`
      }}
    >
      <p>{props.value.toUpperCase()}</p>
    </div>
  )
}
