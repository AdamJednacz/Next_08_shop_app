import React from 'react';
import { Product as ProductType } from "@/types/types";
import classes from "./product.module.css"; // upewnij się, że ścieżka jest poprawna

const Product: React.FC<ProductType> = ({ id, name, price, quantity }) => {
    return (
        <div className={classes.product}>
            <div className={classes.future_img}></div>
            <p className={classes.p}>{name}</p>
            <p className={classes.p}>{price}PLN</p>
        </div>
    );
};

export default Product;