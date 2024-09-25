import React from 'react';

interface InputProps {
    name: string;
    message: string;
}

const Input: React.FC<InputProps> = ({name}) => {
    return (
        <div>
            <label>{name}</label>
            <input />
        </div>
    );
};

export default Input;