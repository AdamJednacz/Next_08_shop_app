"use server"
import classes from "./shop_page.module.css";
import { getProducts } from "@/lib/products";
import Filters from "@/components/shop_components/fillters/Filters";
import Products from "@/components/shop_components/products/Products";
import React, { Suspense } from "react";
import FiltersWrapper from "@/components/shop_components/FiltersWrapper";

const Page = async () => {
    const products = await getProducts(); // działa po stronie serwera

    return (
        <div className={classes.container}>
            <div className={classes.items}>
                <FiltersWrapper products={products} />
            </div>
            <div className={classes.navi}></div>
        </div>
    );
};

export default Page;

// Oddzielny komponent klientowy (w tym samym pliku lub osobno)
