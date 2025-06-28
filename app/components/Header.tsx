import React from 'react';
import classes from "./header.module.css"
import Button from "@/app/components/Button";

const Header = () => {
    return (
        <header className={classes.header}>
            <div className={classes.container}>
            <h1 className={classes.h1}>Fasco</h1>
                <div className={classes.menu}>
                    <a href="/" className={classes.menu_item}>Home</a>
                    <a href="/shop_page" className={classes.menu_item}>Shop</a>
                    <a className={classes.menu_item}>New Arrivals</a>
                    <a className={classes.menu_item}>Packages</a>
                    <a className={classes.menu_item}>Sign in</a>
                    <Button text={"Sign up"}/>
                </div>
            </div>
        </header>
    );
};

export default Header;