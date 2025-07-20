"use client";
import React from 'react';

import Product from "@/components/shop_components/product/Product";
import classes from "./products.module.css";
import { Product as ProductType } from "../../../types/types";
import {FiltersType} from "@/components/shop_components/FiltersWrapper";

type ProductsProps = {
    allProducts: ProductType[];
    filters:FiltersType;
};
// product.price >= filters.price[0] &&
// product.price <= filters.price[1] &&

const Products = ({ allProducts, filters }: ProductsProps) => {

    const filteredProducts = allProducts.filter((product) => {
        return (
            (filters.clothes_type.length === 0 || filters.clothes_type.includes(product.clothes_type)) &&
            (filters.color.length === 0 || filters.color.includes(product.color)) &&
            (filters.size_unit.length === 0 || filters.size_unit.includes(product.size.unit))
        );
    });

    if (filters.sortPrice === "asc") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (filters.sortPrice === "desc") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }
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
