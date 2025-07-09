import React from 'react';
import { Product as ProductType } from "@/app/types/types";
import classes from "./product.module.css"; // upewnij się, że ścieżka jest poprawna

const Product: React.FC<ProductType> = ({ id, name, price, size , material }) => {
    return (
        <div className={classes.product}>
            <div className={classes.future_img}></div>
            <p className={classes.p}>{name}</p>
            <p className={classes.p}>{price}PLN</p>
            <p className={classes.p}>{size.value}</p>
            <p className={classes.p}>{size.unit}</p>
            <p className={classes.p}>{material}</p>
        </div>
    );
};

export default Product;