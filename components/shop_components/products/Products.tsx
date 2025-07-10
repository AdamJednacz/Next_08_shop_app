"use client";
import React from 'react';

import Product from "@/components/shop_components/product/Product";
import classes from "./products.module.css";
import { Product as ProductType } from "../../../types/types";

type ProductsProps = {
    allProducts: ProductType[];
    colorFilter: string | null;
    sizeFilter: string | null;
    typeFilter: string | null;
};

const Products = ({ allProducts, colorFilter, sizeFilter, typeFilter }: ProductsProps) => {


    const filteredProducts = allProducts.filter((product: ProductType) => {
        const matchesColor = colorFilter ? product.color === colorFilter : true;
        const matchesSize = sizeFilter ? product.size.unit.includes(sizeFilter) : true;
        const matchesType = typeFilter ? product.clothes_type === typeFilter : true;

        return matchesColor && matchesSize && matchesType;
    });

    return (
        <div className={classes.products}>
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product: ProductType) => (
                    <Product key={product.id} {...product} />
                ))
            ) : (
                <p>No products match the selected filters.</p>
            )}
        </div>
    );
};

export default Products;
