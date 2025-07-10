"use client";
import { useState } from "react";
import { Product as ProductType } from "@/types/types";
import Filters from "@/components/shop_components/fillters/Filters";
import Products from "@/components/shop_components/products/Products";

type FiltersWrapperProps = {
    products: ProductType[];
};

 const FiltersWrapper = ({ products }: FiltersWrapperProps) => {
    const [colorFilter, setColorFilter] = useState<string | null>(null);
    const [sizeFilter, setSizeFilter] = useState<string | null>(null);
    const [typeFilter, setTypeFilter] = useState<string | null>(null);

    return (
        <>
            <Filters
                colorFilter={colorFilter}
                setColorFilter={setColorFilter}
                sizeFilter={sizeFilter}
                setSizeFilter={setSizeFilter}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
            />
            <Products
                allProducts={products}
                colorFilter={colorFilter}
                sizeFilter={sizeFilter}
                typeFilter={typeFilter}
            />
        </>
    );
};
export default FiltersWrapper