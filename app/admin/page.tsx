import React from 'react';

import SoldProducts from "@/components/admin/soldProducts/SoldProducts";


import classes from "./admin.module.css"
import ProductsOnShop from "@/components/admin/productsOnShop/ProductsOnShop";


const Page = () => {
    return (
        <div className={classes.container} style={{padding: 24}}>

                    <ProductsOnShop/>
                    <SoldProducts/>
        </div>
    );
}
export default Page;