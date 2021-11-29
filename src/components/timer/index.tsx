import React, { FC, useEffect, useState } from 'react'

interface TimerProps {
    startTimer: boolean;
    endTimerFunc: () => void;
    timeInSeconds: number;
}

const Timer : FC<TimerProps> = ({
    startTimer,
    endTimerFunc,
    timeInSeconds
}) => {
    const [ counterInSeconds, setCounterInSeconds ] = useState<number>();
    const [readableFormat, setReadableFormat] = useState<string>();

    console.log(readableFormat);
    useEffect(() => {
        if(counterInSeconds as number > 0 && startTimer){
            setTimeout(() => {
                setCounterInSeconds(prevCount => prevCount as number - 1);
                let seconds : string | number = counterInSeconds as number % 60;
                let minutes : string | number = Math.floor(counterInSeconds as number / 60);
                minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
                seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
                setReadableFormat(minutes + ':' + seconds);
            }, 1000);
        }
        if(counterInSeconds === 0){
            endTimerFunc();
            setCounterInSeconds(timeInSeconds);
        }
    }, [counterInSeconds, startTimer]);

    useEffect(() => {
        setCounterInSeconds(timeInSeconds);
    },[timeInSeconds]);

    return (
        <div>
            {/* { startTimer ? counter : "Timer done"} */}
            {startTimer ? readableFormat : "Timer done"} 
        </div>
    )
}

export default Timer;