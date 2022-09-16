import React, { FC } from 'react';

type difficultyLevelType = 0 | 1 | 2;

interface DifficultyLevelProps{
    setDifficultyLevel: (value: difficultyLevelType) => void;
}


const DifficultyLevel : FC<DifficultyLevelProps> = ({
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

export default DifficultyLevel;