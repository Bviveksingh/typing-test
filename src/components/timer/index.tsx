import React, { FC, useEffect, useState } from 'react'

interface TimerProps {
    startTimer: boolean;
    closeTimer: () => void;
}

const Timer : FC<TimerProps> = ({
    startTimer,
    closeTimer
}) => {
    const [ counter, setCounter ] = useState(10);
    useEffect(() => {
        if(counter > 0 && startTimer){
            setTimeout(() => setCounter(prevCount => prevCount - 1), 1000);
        }
        if(counter === 0){
            closeTimer();
        }
    }, [counter, startTimer]);

    return (
        <div>
            { startTimer ? counter : "Timer done"}
        </div>
    )
}

export default Timer;