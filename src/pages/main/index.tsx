import React, { FC, useEffect, useState } from 'react'
import Paragraph from '../../components/paragraph';
import styles from './main.module.css';
import Timer from '../../components/timer';
import InputBox from '../../components/inputBox';
import { para1 } from '../../paragraphs';

const Main : FC = () => {
    const [startTimer, setStartTimer] = useState<boolean>(false);
    const [endTimer, setEndTimer] = useState<boolean>(false);
    const [inputVal, setInputVal] = useState<string>('');
    const [displayVal, setDisplayVal] = useState<string>(para1);
    const splitToArr = displayVal.split('');
    const [newArr, setNewArr] = useState<JSX.Element[]>([]);
    const [inpBoxSplit, setInpBoxSplit] = useState<string[]>([]);
    const [wordsPerMin, setWordsPerMin] = useState<number | undefined>();
    const [minutes, setMinutes] = useState<number>(1);
    const [incorrectEntry, setIncorrectEntry] = useState<number>(0);
    const [accuracy, setAccuracy] = useState<number>(0);
    const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
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
        if(inputVal){
            setStartTimer(true);
        }
    },[inputVal]);

    useEffect(() => {
        compareStuff();
    }, [inpBoxSplit]);  

    useEffect(() => {
        setNewArr(splitToArr.map(val => (AddSpan(val, "normalText"))));
    }, []);

    useEffect(() => {
        if(!startTimer && inpBoxSplit.length > 0){
            computeResult();
        }
    },[startTimer, inpBoxSplit])
    return (
        <div className={styles.container}>
            <Timer timeInSeconds={timeInSeconds} startTimer={startTimer} endTimerFunc={endTimerFunc}/>
            <Paragraph value={newArr}/>
            <InputBox value={inputVal} onChange={(e) => doEverything(e)}/>
            <button onClick={() => setTimeInSeconds(60)}>1</button>
            <button onClick={() => setTimeInSeconds(120)}>2</button>
            <button onClick={() => setTimeInSeconds(180)}>3</button>
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

export default Main;