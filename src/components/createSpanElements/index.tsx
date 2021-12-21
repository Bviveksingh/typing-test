import React, { FC } from 'react';
import styles from './styles.module.css';

interface CreateSpanElementsProps{
    value: string;
    index: number;
    nameClass?: string;
}

const CreateSpanElements : FC<CreateSpanElementsProps> = ({
    value,
    index,
    nameClass
}) => {
    const getClassName = () => {
        if(nameClass === "correctText"){
            return styles.correctText;
        }
        else if(nameClass === "wrongText"){
            return styles.wrongText;
        }
        return styles.normalText;
    }
    return(
        <span key={index} className={getClassName()}>{value}</span>
    )
}

export default CreateSpanElements;