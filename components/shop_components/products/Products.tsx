"use client";
import React, {useState} from 'react';
import "../../../app/globals.css";
import Product from "@/components/shop_components/product/Product";
import classes from "./products.module.css";
import { Product as ProductType } from "../../../types/types";
import {FiltersType} from "@/components/shop_components/FiltersWrapper";
import {Pagination} from "antd";
import Link from "next/link";

type ProductsProps = {
    allProducts: ProductType[];
    filters:FiltersType;
};
// product.price >= filters.price[0] &&
// product.price <= filters.price[1] &&

const Products = ({ allProducts, filters }: ProductsProps) => {


    const [currentPage, setCurrentPage] = useState<number>(1)
    const pageSize = 10;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

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
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    return (
        <div className={classes.products}>
            <div className={classes.products_wrapper}>
            {filteredProducts.length > 0 ? (

                paginatedProducts.map((product: ProductType) => (
                    <Link href={`/shop_page/${product.id}`} key={product.id} style={{ textDecoration: "none" ,color: "#666" }}>
                    <Product key={product.id} {...product} />
                    </Link>
                ))

            ) : (
                <p>No products match the selected filters.</p>
            )}
            </div>
                <Pagination  current={currentPage}
                             pageSize={pageSize}
                             onChange={handlePageChange}
                             defaultCurrent={1}
                             total={filteredProducts.length}

                />

        </div>
    );
};

export default Products;
