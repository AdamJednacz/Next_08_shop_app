import React from 'react';
import classes from "@/components/design components/header/header.module.css";

type ButtonProps = {
    text: string;
    link?: string;
};

const Button = ({ text ,link }: ButtonProps)=> {
    return (
        <a href={link}>
        <button className={classes.button}>{text}</button>
        </a>
    );
};

export default Button;