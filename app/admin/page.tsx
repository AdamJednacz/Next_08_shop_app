import React from 'react';
import FormProduct from "@/components/admin/formProduct/FormProduct";
import SoldProducts from "@/components/admin/soldProducts/SoldProducts";
import createProduct from "@/app/actions/createProduct";
import Products from "@/components/shop_components/products/Products";
import classes from "./admin.module.css"
import ProductsOnShop from "@/components/admin/productsOnShop/ProductsOnShop";
import { Row, Col } from "antd";

const Page = () => {
    return (
        <div className={classes.container} style={{padding: 24}}>


                    <ProductsOnShop/>

                    <SoldProducts/>

        </div>
    );
}
export default Page;