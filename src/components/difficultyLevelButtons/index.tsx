import React, { FC } from 'react';



interface DifficultyLevelButtonsProps{
    setDifficultyLevel: (value: number) => void;
}


const DifficultyLevelButtons : FC<DifficultyLevelButtonsProps> = ({
    setDifficultyLevel
}) => {
    return(
        <div>
         <button onClick={() => setDifficultyLevel(0)}>Easy</button>
         <button onClick={() => setDifficultyLevel(1)}>Medium</button>
         <button onClick={() => setDifficultyLevel(2)}>Difficult</button>
        </div>
    )
} ;

export default DifficultyLevelButtons;