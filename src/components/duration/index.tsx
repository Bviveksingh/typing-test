import React, { FC } from 'react';

type timeInSecondsType = 60 | 120 | 180;

interface DurationProps{
    setTimeInSeconds: (value: timeInSecondsType) => void;
}



const Duration : FC<DurationProps> = ({
    setTimeInSeconds
}) => {
    return (
        <div>
            <button onClick={() => setTimeInSeconds(60)}>1</button>
            <button onClick={() => setTimeInSeconds(120)}>2</button>
            <button onClick={() => setTimeInSeconds(180)}>3</button>
        </div>
    )
}

export default Duration;