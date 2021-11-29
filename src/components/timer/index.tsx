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
    const [ counterInSeconds, setCounterInSeconds ] = useState(timeInSeconds);
    // const [secondTimerCount, setSecondTimerCount] = useState<number>(0);
    // const [minuteTimerCount, setMinuteTimerCount] = useState<number>(0);
    const [readableFormat, setReadableFormat] = useState<string>();
    // const returnReadableTimer = () => {
    //     return { minuteTimerCount.toString().length === 1 ? "0" + minuteTimerCount : minuteTimerCount + 
    //         secondTimerCount = secondTimerCount.toString().length === 1 ? "0" + secondTimerCount : secondTimerCount}
    // }
    useEffect(() => {
        if(counterInSeconds > 0 && startTimer){
            setTimeout(() => {
                setCounterInSeconds(prevCount => prevCount - 1);
                let seconds : string | number = counterInSeconds % 60;
                let minutes : string | number = Math.floor(counterInSeconds / 60);
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

    return (
        <div>
            {/* { startTimer ? counter : "Timer done"} */}
            {startTimer ? readableFormat : "Timer done"} 
        </div>
    )
}

export default Timer;