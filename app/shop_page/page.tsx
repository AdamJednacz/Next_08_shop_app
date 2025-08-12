"use server"
import classes from "./shop_page.module.css";
import { getProducts } from "@/lib/products";

import React, { Suspense } from "react";
import FiltersWrapper from "@/components/shop_components/FiltersWrapper";

const Page = async () => {
    const products = await getProducts();

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

