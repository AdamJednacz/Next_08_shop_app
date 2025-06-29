import React from 'react';
import classes from "./header.module.css"
import Button from "@/components/design components/Button";

const Header = () => {
    return (
        <header className={classes.header}>
            <div className={classes.container}>
            <a href="/" className={classes.logo}>Fasco</a>
                <div className={classes.menu}>
                    <a href="/" className={classes.menu_item}>Home</a>
                    <a href="/shop_page" className={classes.menu_item}>Shop</a>
                    <a className={classes.menu_item}>New Arrivals</a>
                    <a className={classes.menu_item}>Packages</a>
                    <a className={`${classes.menu_item} ${classes.menu_item_last}`}>Sign in</a>                    <Button text={"Sign up"}/>
                </div>
            </div>
        </header>
    );
};

export default Header;