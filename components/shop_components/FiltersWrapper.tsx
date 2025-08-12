"use client";
import { useState } from "react";
import {Product, Product as ProductType, ProductColor} from "@/types/types";

import Products from "@/components/shop_components/products/Products";
import FiltersComponent from "@/components/shop_components/fillters/FiltersComponent";

type SortOrder = "asc" | "desc" | null;

type FiltersWrapperProps = {
    products: ProductType[];
};
export type FiltersType = {
    clothes_type: Product["clothes_type"][];
    color: ProductColor[];
    size_unit: Product["size"]["unit"][];
    sortPrice: SortOrder;
};


 const FiltersWrapper = ({ products }: FiltersWrapperProps) => {
     const [filters, setFilters] = useState<FiltersType>({
         clothes_type: [],
         color: [],
         size_unit: [],
         sortPrice: null,
     });


    return (
        <>
            <FiltersComponent
            filters = {filters}
            setFilters={setFilters}
            />
            <Products
                allProducts={products}
                filters={filters}
            />
        </>
    );
};
export default FiltersWrapper