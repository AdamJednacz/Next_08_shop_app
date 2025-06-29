"use client"

import React, { useActionState } from "react";
const AddProducts = ({action}) => {
    const [state,formAction] = useActionState(action ,{});

    return (
        <>
            <h1>Create a new product</h1>
            <form action={formAction}>
                <p className="form-control">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" />
                </p>
                <p className="form-control">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                    />
                </p>
                <p className="form-control">
                    <label htmlFor="quantity">Quantity</label>
                        <input id="quantity" name="quantity" type="number" />
                </p>

                <button type="submit">Add Product</button>

                {state.errors && <ul className="form-errors">
                    {state.errors.map(error =>
                        <li key={error}>{error}</li>
                    )}
                </ul>}
            </form>
        </>
    );
};

export default AddProducts;