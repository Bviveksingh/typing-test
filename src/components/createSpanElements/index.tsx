import React, { FC } from 'react';
import styles from './styles.module.css';

type nameClassType = 0 | 1 | -1;
interface CreateSpanElementsProps{
    value: string;
    index: number;
    nameClass?: nameClassType;
}

const CreateSpanElements : FC<CreateSpanElementsProps> = ({
    value,
    index,
    nameClass
}) => {
    const getClassName = () => {
        if(nameClass === 1){
            return styles.correctText;
        }
        else if(nameClass === -1){
            return styles.wrongText;
        }   
        return styles.normalText;
    }
    return(
        <span key={index} className={getClassName()}>{value}</span>
    )
}

export default CreateSpanElements;