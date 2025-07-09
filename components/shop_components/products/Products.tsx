import React from 'react';
import {getProducts} from "@/lib/products";
import Product from "@/components/shop_components/product/Product";
import classes from "./products.module.css"


const Products = async () => {
    const products = await getProducts();
    return (
        <div className={classes.products}>
            {products.map((product) => (
                <Product key={product.id} {...product} />

            ))}
        </div>
    );
};

export default Products;