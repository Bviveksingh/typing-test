import React, { FC, useEffect, useState } from 'react'

interface TimerProps {
    startTimer: boolean;
}

const Timer : FC<TimerProps> = ({
    startTimer
}) => {
    const [ counter, setCounter ] = useState(60);
    useEffect(() => {
        if(counter > 0 && startTimer){
            setTimeout(() => setCounter(prevCount => prevCount - 1), 1000);
        }
    }, [counter, startTimer]);

    return (
        <div>
            { startTimer ? counter : "Timer done"}
        </div>
    )
}

export default Timer;