"use client"

import classes from "./addProducts.module.css"
import React, {useActionState, useEffect} from "react";
import {useRouter} from "next/router";
const AddProducts = ({action}) => {
    const [state,formAction] = useActionState(action ,{});


    useEffect(() => {
        if (state?.success) {
            window.location.reload();
        }
    }, [state]);

    return (
        <>
            <h1 className={classes.h1}>Create a new product</h1>
            <form className={classes.form} action={formAction}>
                <p className = {classes.form_control}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" />
                </p>
                <p className = {classes.form_control}>
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                    />
                </p>
                <p className = {classes.form_control}>
                    <label htmlFor="size_value">Product quantity</label>
                        <input id="size_value" name="size_value" type="number" />
                </p>

                <p className = {classes.form_control}>
                    <label htmlFor="size_unit">Product size</label>
                    <select id="size_unit" name="size_unit" >
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>

                    </select>
                </p>
                <p className = {classes.form_control}>
                    <label htmlFor="product_type">Product Type</label>
                    <select id="product_type" name="product_type" >
                        <option value="T-shirt">T-shirt</option>
                        <option value="Shirt">Shirt</option>
                        <option value="Hat">Hat</option>
                        <option value="Trousers">Trousers</option>
                        <option value="Hoodie">Hoodie</option>

                    </select>
                </p>
                <p className = {classes.form_control}>
                    <label htmlFor="size_value">Material</label>
                    <input id="material" name="material" type="text" />
                </p>
                <p className = {classes.form_control}>
                    <label htmlFor="product_color">Product_color</label>
                    <input id="product_color" name="product_color" type="color" />
                </p>

                <button className={classes.button} type="submit">Add Product</button>

                {state?.errors?.length > 0 && (
                    <ul>
                        {state.errors.map((err, i) => (
                            <li key={i} className="text-red-500">{err}</li>
                        ))}
                    </ul>
                )}
            </form>
        </>
    );
};

export default AddProducts;