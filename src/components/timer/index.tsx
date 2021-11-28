import React, { FC, useEffect, useState } from 'react'

interface TimerProps {
    startTimer: boolean;
    endTimerFunc: () => void;
}

const Timer : FC<TimerProps> = ({
    startTimer,
    endTimerFunc
}) => {
    const [ counter, setCounter ] = useState(10);
    useEffect(() => {
        if(counter > 0 && startTimer){
            setTimeout(() => setCounter(prevCount => prevCount - 1), 1000);
        }
        if(counter === 0){
            endTimerFunc();
            setCounter(10);
        }
    }, [counter, startTimer]);

    return (
        <div>
            { startTimer ? counter : "Timer done"}
        </div>
    )
}

export default Timer;