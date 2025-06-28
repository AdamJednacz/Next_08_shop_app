import React from 'react';
import classes from "@/app/components/header.module.css";

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