import React, { useState } from 'react'

export default function WinPage(props : {streak: number, win: boolean, answer: string}) {

  function getTime(){
    const currentTime = new Date().getTime();
    const nextMidnight = new Date(currentTime).setHours(24, 0, 0, 0);
    const timeUntilMidnight = nextMidnight - currentTime;
    const timeUntilMidnightInSeconds = timeUntilMidnight / 1000;

    const hours = Math.floor(timeUntilMidnightInSeconds / 3600);
    const minutes = Math.floor((timeUntilMidnightInSeconds % 3600) / 60);
    const seconds = Math.floor(timeUntilMidnightInSeconds % 60);

    const formattedTime = `${hours} hours, ${minutes} minutes, ${seconds} seconds`;

    return formattedTime
  }

  const [calcTime, setCalcTime] = useState(getTime())

  setTimeout(() => {
    setCalcTime(getTime())
  }, 1000);

  return (
    <div className='WinPage'>
      {props.win && <h1>Congragulation!</h1>}
      {!props.win && <h1>Better luck next time</h1>}
      {!props.win && <h3>Answer was {props.answer}</h3>}
      <h3>Come back in {calcTime}</h3>
      <h3>Current streak: {props.streak}</h3>
    </div>
  )
}
