'use client'

import React, {ReactElement,} from 'react';
import classes from "./header.module.css"
import Button from "@/components/design components/button/Button";
import {useUser} from "@/context/userContext";
import {logout} from "@/actions/auth/auth-action";
import {RollbackOutlined, SettingOutlined, ShoppingCartOutlined, StarOutlined, UserOutlined} from "@ant-design/icons";
import {Dropdown, } from "antd";

interface DropdownItem {
    key: string;
    label: ReactElement;
}


const Header = () => {

    const {user} = useUser();
    const items1:DropdownItem[]  = [
        {
            key: '1',
            label: (
                <div className={classes.menu_dropdown_item}>
                <a href="/settings"><SettingOutlined className={classes.menu_dropdown_item_icon} />Settings</a>
                </div>
            )
        },
        {
            key: '2',
            label: (
                <div className={classes.menu_dropdown_item}>
                <a href="/profile"><UserOutlined className={classes.menu_dropdown_item_icon} />Profile</a>
                </div>
            )
        },
        {
            key: '3',
            label: (
                <form className={classes.menu_dropdown_item} action={logout}>
                    <button  type={"submit"}><RollbackOutlined className={classes.menu_dropdown_item_icon_3} /> Logout</button>
                </form>
            )
        }
    ]


    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <a href="/" className={classes.logo}>Fasco</a>

                {user ? (
                    <>
                        <div className={classes.menu}>
                            <a href="/" className={classes.menu_item}>Home</a>
                            <a href="/shop_page" className={classes.menu_item}>Shop</a>
                            <a className={classes.menu_item}>New Arrivals</a>
                            <a className={classes.menu_item}>Packages</a>
                        </div>
                        <div className={classes.menu_icons}>
                            <p>Witaj <span style={{fontWeight:'bold'}}>{user.name} {user.surname}</span></p>
                            <StarOutlined className={classes.menu_icon}/>
                            <ShoppingCartOutlined className={classes.menu_icon}/>
                            <Dropdown arrow={{pointAtCenter:true}} placement="bottom"  menu={{items: items1}}>
                              <span className={classes.menu_icon}>
                                <UserOutlined/>
                              </span>
                            </Dropdown>
                        </div>
                    </>
                ) : (
                    <div className={classes.menu}>
                        <a href="/" className={classes.menu_item}>Home</a>
                        <a href="/shop_page" className={classes.menu_item}>Shop</a>
                        <a className={classes.menu_item}>New Arrivals</a>
                        <a className={classes.menu_item}>Packages</a>

                        <a href="/login" className={`${classes.menu_item} ${classes.menu_item_last}`}>
                            Sign in
                        </a>
                        <Button link={"register"} text={"Sign up"}/>
                    </div>

                )}


            </div>
        </header>
    );
};

export default Header;