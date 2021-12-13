import React, { FC } from 'react';

interface MinuteButtonsProps{
    setTimeInSeconds: (value: number) => void;
}



const MinuteButtons : FC<MinuteButtonsProps> = ({
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

export default MinuteButtons;