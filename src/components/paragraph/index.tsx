import React, { FC } from 'react';
import styles from './paragraph.module.css';

interface ParagraphProps{
    value: any;
}

const Paragraph : FC<ParagraphProps> = ({
    value
}) => {
    return (
        <div className={styles.container}>
            {value}
        </div>
    )
}

export default Paragraph;
