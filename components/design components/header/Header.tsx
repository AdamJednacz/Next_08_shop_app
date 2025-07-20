'use client'

import React, {useEffect, useState} from 'react';
import classes from "./header.module.css"
import Button from "@/components/design components/button/Button";
import {useUser} from "@/context/userContext";



const Header =() => {

    const { user } = useUser();


    return (
        <header className={classes.header}>
            <div className={classes.container}>
            <a href="/" className={classes.logo}>Fasco</a>
                <div className={classes.menu}>
                    <a href="/" className={classes.menu_item}>Home</a>
                    <a href="/shop_page" className={classes.menu_item}>Shop</a>
                    <a className={classes.menu_item}>New Arrivals</a>
                    <a className={classes.menu_item}>Packages</a>
                    {user ? (
                        <>
                           <p className={classes.menu_item}>{user.name} {user.surname}</p>
                            <Button text={"Logout"}/>
                        </>
                    ) : (
                        <>
                            <a href="/login" className={`${classes.menu_item} ${classes.menu_item_last}`}>
                                Sign in
                            </a>
                            <Button link={"register"} text={"Sign up"} />
                        </>
                    )}

                </div>
            </div>
        </header>
    );
};

export default Header;