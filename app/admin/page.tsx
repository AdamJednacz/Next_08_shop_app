import React from 'react';
import AddProducts from "@/components/admin/AddProducts";
import SoldProducts from "@/components/admin/SoldProducts";
import createProduct from "@/app/actions/products";

const Page = () => {
    return (
        <div>
            <AddProducts action={createProduct}/>
            <SoldProducts/>
        </div>
    );
};

export default Page;