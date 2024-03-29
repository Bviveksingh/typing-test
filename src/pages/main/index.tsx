import React, { FC, useEffect, useState } from 'react'
import Paragraph from '../../components/paragraph';
import styles from './main.module.css';
import Timer from '../../components/timer';
import InputBox from '../../components/inputBox';
import { paragraphs } from '../../paragraphs';
import DifficultyLevel from '../../components/difficultyLevel';
import Duration from '../../components/duration';
import CreateSpanElements from '../../components/createSpanElements';

const Main : FC = () => {
    const [startTimer, setStartTimer] = useState<boolean>(false); 
    const [endTimer, setEndTimer] = useState<boolean>(false); 
    const [eligibleToStart, setEligibleToStart] = useState<boolean>(false); 
    const [inputVal, setInputVal] = useState<string>(''); 
    const [displayVal, setDisplayVal] = useState<string>('');
    const [splitToArr, setSplitToArr] = useState<string[]>([]); 
    const [paragraphArr, setParagraphArr] = useState<JSX.Element[]>([]); 
    const [inpBoxSplit, setInpBoxSplit] = useState<string[]>([]); 
    const [wordsPerMin, setWordsPerMin] = useState<number | undefined>();
    const [minutes, setMinutes] = useState<number>(1);
    const [incorrectEntry, setIncorrectEntry] = useState<number>(0);
    const [accuracy, setAccuracy] = useState<number>(0);
    const [timeInSeconds, setTimeInSeconds] = useState<number>(); 
    const [difficultyLevel, setDifficultyLevel] = useState<number | undefined>(); 
    
    // Compare the input value entered with the paragraph and update the css and result accordingly
    const compare = () => {
            if(inpBoxSplit[inpBoxSplit.length - 1] !== splitToArr[inpBoxSplit.length - 1]){
                const copyArr = paragraphArr.slice();
                copyArr[inpBoxSplit.length - 1] = <CreateSpanElements value={splitToArr[inpBoxSplit.length - 1]} index={inpBoxSplit.length-1} nameClass={-1} />;
                setIncorrectEntry(prevState => ++prevState);
                setParagraphArr(copyArr);
            }
            else{
                const copyArr = paragraphArr.slice();
                copyArr[inpBoxSplit.length - 1] = <CreateSpanElements value={splitToArr[inpBoxSplit.length - 1]} index={inpBoxSplit.length-1} nameClass={1} />;
                setParagraphArr(copyArr);
            }
    };


    // Function that computes result and sets result fields
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
        setDifficultyLevel(undefined);
        setIncorrectEntry(0);
        setTimeInSeconds(0);
        setEligibleToStart(false);
        setDisplayVal('');
        setSplitToArr([]);
    }

    const displayResult = () => {
        return(
            <div>
                <p>The words per minute written: {wordsPerMin}</p>
                <p>Percentage Accuracy: {accuracy}%</p>
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

    // For every change in Input value trigger comparing function
    useEffect(() => {
        compare();
    }, [inpBoxSplit]);

    //Show the input box only when the user has set the timer and difficulty level
    /*----DONE---*/
    useEffect(() => {
        if(timeInSeconds && paragraphArr.length > 0){
            setEligibleToStart(true);
        }
    },[timeInSeconds,paragraphArr]);
    
    useEffect(() => {
        if(displayVal){
            setSplitToArr(displayVal.split(''));
        }
    }, [displayVal]);

    useEffect(() => {
        setParagraphArr(splitToArr.map((val,index) => <CreateSpanElements value={val} index={index} nameClass={0}/>));
    },[splitToArr]);

    useEffect(() => {
        if(!startTimer && inpBoxSplit.length > 0){
            computeResult();
        }
    },[startTimer, inpBoxSplit])
    return (
        <div className={styles.container}>
            <p>Set Timer and Difficulty level before starting the test</p>
            {timeInSeconds as number > 0 ? <Timer timeInSeconds={timeInSeconds as number} startTimer={startTimer} endTimerFunc={endTimerFunc}/> : <Duration setTimeInSeconds={setTime}/>}
            {difficultyLevel === undefined && <DifficultyLevel setDifficultyLevel={setDifficulty}/>}
            {paragraphArr.length > 0 && <Paragraph value={paragraphArr.length > 0 ? paragraphArr : [] }/>}    
            {!endTimer && eligibleToStart && <InputBox value={inputVal} onChange={(e) => setInputVal(e.target.value)}/>}
            {inputVal.length > 0 && <button onClick={() => resetTest()}>Reset</button>} 
            {endTimer && displayResult()}

        </div>
    )
}

export default Main;