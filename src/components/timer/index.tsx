import React, { FC, useEffect, useMemo, useState } from 'react'

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
    const [ readableFormat, setReadableFormat ] = useState<string>();

    const getReadableFormat = useMemo(() => {
        let seconds : string | number = counterInSeconds as number % 60;
                let minutes : string | number = Math.floor(counterInSeconds as number / 60);
                minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
                seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
                return `${minutes} : ${seconds}`;
    }, [counterInSeconds]);

    useEffect(() => {
        if(counterInSeconds as number > 0 && startTimer){
            setTimeout(() => {
                setCounterInSeconds(prevCount => prevCount as number - 1);
                setReadableFormat(getReadableFormat);
            }, 1000);
        }
        if(counterInSeconds === 0){
            endTimerFunc();
            setCounterInSeconds(timeInSeconds);

        }
    }, [counterInSeconds, startTimer, timeInSeconds]);


    useEffect(() => {
        setReadableFormat(getReadableFormat);
    },[counterInSeconds]);



    useEffect(() => {
        setCounterInSeconds(timeInSeconds);
    },[timeInSeconds]);

    return (
        <div>
            {startTimer ? readableFormat : 'Timer is set, type to trigger timer'} 
        </div>
    )
}

export default Timer;