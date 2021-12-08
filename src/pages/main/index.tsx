import React, { FC, useEffect, useState } from 'react'
import Paragraph from '../../components/paragraph';
import styles from './main.module.css';
import Timer from '../../components/timer';
import InputBox from '../../components/inputBox';
import { paragraphs } from '../../paragraphs';

const Main : FC = () => {
    const [startTimer, setStartTimer] = useState<boolean>(false);
    const [endTimer, setEndTimer] = useState<boolean>(false);
    const [eligibleToStart, setElegibleToStart] = useState<boolean>(false);
    const [inputVal, setInputVal] = useState<string>('');
    const [displayVal, setDisplayVal] = useState<string>('');
    const [splitToArr, setSplitToArr] = useState<string[]>([]);
    const [newArr, setNewArr] = useState<JSX.Element[]>([]);
    const [inpBoxSplit, setInpBoxSplit] = useState<string[]>([]);
    const [wordsPerMin, setWordsPerMin] = useState<number | undefined>();
    const [minutes, setMinutes] = useState<number>(1);
    const [incorrectEntry, setIncorrectEntry] = useState<number>(0);
    const [accuracy, setAccuracy] = useState<number>(0);
    const [timeInSeconds, setTimeInSeconds] = useState<number>();

    const [difficultyLevel, setDifficultyLevel] = useState<number | undefined>();

    const doEverything = (e: any) => {
        setInputVal(e.target.value);
    };
    
    const compareStuff = () => {
            if(inpBoxSplit[inpBoxSplit.length - 1] !== splitToArr[inpBoxSplit.length - 1]){
                const copyArr = newArr.slice();
                copyArr[inpBoxSplit.length - 1] = AddSpan(splitToArr[inpBoxSplit.length - 1], "wrongText");
                setIncorrectEntry(prevState => ++prevState);
                setNewArr(copyArr);
            }
            else{
                const copyArr = newArr.slice();
                copyArr[inpBoxSplit.length - 1] = AddSpan(splitToArr[inpBoxSplit.length - 1], "normalText");
                setNewArr(copyArr);
            }
    };

    const computeResult = () => {
        const result = (inputVal.length / 5) / minutes;
        const percentage = (((inputVal.length - incorrectEntry) / inputVal.length) * 100).toFixed(2);
        setWordsPerMin(result);
        setAccuracy(parseFloat(percentage));

    }

    const resetTest = () => {
        setEndTimer(false);
        setInputVal('');
        setInpBoxSplit([]);
        setWordsPerMin(undefined);
        setAccuracy(0);
        setIncorrectEntry(0);
        setTimeInSeconds(0);
        setElegibleToStart(false);
        setDisplayVal('');
        setSplitToArr([]);
    }

    
    const displayResult = () => {
        return(
            <div>
                <p>The words per minute written: {wordsPerMin}</p>
                <p>Percentage Accuracy: {accuracy}%</p>
                <button onClick={() => resetTest()}>Reset</button>
            </div>
        )
    };

    const setTime = (seconds: number) => {
        setTimeInSeconds(seconds);
    }

    const setDifficulty = (value: number) => {
        setDifficultyLevel(value);
        setDisplayVal(paragraphs[value]);
    }

    const endTimerFunc = () => {
        setStartTimer(false);
        setEndTimer(true);
    }
    useEffect(() => {
        if(inputVal){
            const x =  inputVal.split('');
            setInpBoxSplit(x);
        }
        
    },[inputVal]);

    useEffect(() => {
        if(inputVal && !endTimer){
            setStartTimer(true);
        }
    },[inputVal]);

    useEffect(() => {
        compareStuff();
    }, [inpBoxSplit]);

    //Show the input box only when the user has set the timer and difficulty level
    useEffect(() => {
        if(timeInSeconds && newArr.length > 0){
            setElegibleToStart(true);
        }
    },[timeInSeconds,newArr]);

    useEffect(() => {
        if(displayVal){
            setSplitToArr(displayVal.split(''));
        }
    }, [displayVal]);

    useEffect(() => {
        setNewArr(splitToArr.map(val => (AddSpan(val, "normalText"))));
    },[splitToArr]);

    useEffect(() => {
        if(!startTimer && inpBoxSplit.length > 0){
            computeResult();
        }
    },[startTimer, inpBoxSplit])
    return (
        <div className={styles.container}>
            {timeInSeconds as number > 0 ? <Timer timeInSeconds={timeInSeconds as number} startTimer={startTimer} endTimerFunc={endTimerFunc}/> : <MinuteButtons setTimeInSeconds={setTime}/>}
            <DifficultyLevelButtons setDifficultyLevel={setDifficulty}/> 
            {newArr.length > 0 && <Paragraph value={newArr.length > 0 ? newArr : [] }/>}
            {!endTimer && eligibleToStart && <InputBox value={inputVal} onChange={(e) => doEverything(e)}/>}
            {endTimer && displayResult()}
        </div>
    )
}

const AddSpan = (value: string, nameClass: string) => {
    return(
        <>
            <span className={nameClass === "normalText" ? styles.normalText : styles.wrongText}>{value}</span>
        </>
    )
}

interface MinuteButtonsProps{
    setTimeInSeconds: (value: number) => void;
}

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

const MinuteButtons : FC<MinuteButtonsProps> = ({
    setTimeInSeconds
}) => {
    return (
        <div>
            <button onClick={() => setTimeInSeconds(10)}>1</button>
            <button onClick={() => setTimeInSeconds(120)}>2</button>
            <button onClick={() => setTimeInSeconds(180)}>3</button>
        </div>
    )
}

export default Main;