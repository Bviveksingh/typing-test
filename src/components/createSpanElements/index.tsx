import React, { FC } from 'react';
import styles from './styles.module.css';

interface CreateSpanElementsProps{
    value: string;
    index: number;
    nameClass: string;
}

const CreateSpanElements : FC<CreateSpanElementsProps> = ({
    value,
    index,
    nameClass
}) => {
    return(
        <span key={index} className={nameClass === "normalText" ? styles.normalText : styles.wrongText}>{value}</span>
    )
}

export default CreateSpanElements;