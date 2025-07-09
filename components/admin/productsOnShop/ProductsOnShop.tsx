
import {getProducts} from "@/lib/products";

import ProductsOnShopTable from "@/components/admin/productsOnShop/ProductsOnShopTable";

const ProductsOnShop = async () => {
    const products = await getProducts();


    return (
       <ProductsOnShopTable products={products} />
    );
};

export default ProductsOnShop;
