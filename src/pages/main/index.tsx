import React, { FC, useEffect, useState } from 'react'
import Paragraph from '../../components/paragraph';
import styles from './main.module.css';
import Timer from '../../components/timer';
import InputBox from '../../components/inputBox';
import { para1 } from '../../paragraphs';

const Main : FC = () => {
    const [startTimer, setStartTimer] = useState<boolean>(false);
    const [inputVal, setInputVal] = useState<string>();
    const [displayVal, setDisplayVal] = useState<string>(para1);
    const splitToArr = displayVal.split('');
    const [newArr, setNewArr] = useState<JSX.Element[]>([]);
    const [inpBoxSplit, setInpBoxSplit] = useState<string[]>([]);
    const doEverything = (e: any) => {
        setInputVal(e.target.value);
    }
    // console.log("Input box split", inpBoxSplit[inpBoxSplit.length-1]);
    // console.log("Split array", splitToArr[inpBoxSplit.length -1]);

    
    const compareStuff = () => {
            if(inpBoxSplit[inpBoxSplit.length - 1] !== splitToArr[inpBoxSplit.length - 1]){
                const copyArr = newArr.slice();
                copyArr[inpBoxSplit.length - 1] = AddSpan(splitToArr[inpBoxSplit.length - 1], "wrongText");
                setNewArr(copyArr);
            }
            else{
                const copyArr = newArr.slice();
                console.log("Correct");
                copyArr[inpBoxSplit.length - 1] = AddSpan(splitToArr[inpBoxSplit.length - 1], "normalText");
                setNewArr(copyArr);
            }
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
    }, [])
    return (
        <div className={styles.container}>
            <Timer startTimer={startTimer}/>
            <Paragraph value={newArr}/>
            <InputBox value={inputVal} onChange={(e) => doEverything(e)}/>
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