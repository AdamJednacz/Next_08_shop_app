import React from 'react';
import classes from "@/components/design components/header/header.module.css";

type ButtonProps = {
    text: string;
    link?: string;
    type?:  "submit" | "reset" | "button" | undefined;
};

const Button = ({ type, text ,link }: ButtonProps)=> {
    return (
        <a href={link}>
        <button type={type} className={classes.button}>{text}</button>
        </a>
    );
};

export default Button;