import React, { ChangeEvent, FC } from 'react'


interface InputBoxProps{
    value: string | undefined;
    onChange: (e:ChangeEvent<HTMLInputElement>) => void;
}

const InputBox : FC<InputBoxProps> = ({
    value,
    onChange
}) => {
    return (
        <div>
            <input value={value} type="text" onChange={onChange}/>
        </div>
    )
}

export default InputBox;
