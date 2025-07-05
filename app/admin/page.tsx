import React from 'react';
import AddProducts from "@/components/admin/AddProducts";
import SoldProducts from "@/components/admin/SoldProducts";
import createProduct from "@/app/actions/products";
import Products from "@/components/shop_components/Products";
import classes from "./admin.module.css"
import ProductsOnShop from "@/components/admin/ProductsOnShop";

const Page = () => {
    return (
        <div>
            <AddProducts action={createProduct}/>
            <ProductsOnShop/>
            <SoldProducts/>
        </div>
    );
};

export default Page;