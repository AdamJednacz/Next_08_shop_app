
import React from 'react';

import ProductSite from "@/components/shop_components/productSite/productSite";
import {getProductById} from "@/lib/products";

type PageProps = {
    params: {
        product: string;
    };
};



export default async function Page({ params }: PageProps) {
    const awaitedParams = await params;
    const productId = Number(awaitedParams.product);
    const productData = await getProductById(productId);

    if (!productData) {
        return <div>Nie znaleziono produktu.</div>;
    }

    return (
        <div>
            <ProductSite product={productData} />
        </div>
    );
}