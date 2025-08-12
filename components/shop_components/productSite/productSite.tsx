"use client"
import React, {useState} from 'react';
import {getProductById} from "@/lib/products";
import {Product} from "@/types/types";
import styles from "./productSite.module.css";
import namer from 'color-namer';
import {FiltersType} from "@/components/shop_components/FiltersWrapper";
import classes from "@/components/shop_components/fillters/filters.module.css";
import QuantityCounter from "@/components/shop_components/productSite/QuantityCounter";
import QuantityLeft from "@/components/shop_components/productSite/QuantityLeft";
type ProductProps = {
    product: Product;
};
const capitalizeFirstLetter = (string:string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
};


const ProductSite =  ({product}: ProductProps) => {
    const names = namer(product.color)
    const closestName = names.basic[0].name;
    const formattedName = capitalizeFirstLetter(closestName);
    const availableSizes: FiltersType["size_unit"] = ["S", "M", "L", "XL"];
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
    return (
        <div className="container">
            <div className={styles.product_card}>
                <div style={{backgroundColor:`${product.color}`,width:"200px" ,height:"500px"}}></div>
                <div className={styles.product_card_text}>
                    <h3 className={styles.product_card_text_name}>{product.name}</h3>
                    <p className={styles.product_card_text_price}>{product.price} PLN</p>
                    <QuantityLeft quantity={product.size.quantity}/>
                    <p className={styles.product_card_text_size}>Size: {product.size.unit}</p>
                        <div className={styles.product_card_text_sizes}>
                            {availableSizes.map((size) => (
                                <div
                                    key={size}
                                    className={`${styles.product_card_text_sizes_size} ${size === product.size.unit && styles.active}`}

                                >
                                    {size}
                                </div>
                            ))}
                        </div>
                    <p className={styles.product_card_text_color}><span>Color:</span> {formattedName}</p>
                    <form className={styles.form}>
                        <div>

                            <p>Quantity</p>
                        <QuantityCounter
                            selectedQuantity={selectedQuantity}
                            onQuantityChange={setSelectedQuantity}
                        />
                        </div>
                    <button className={styles.add_too_cart}>Add to cart</button>
                    </form>
                </div>

            </div>

        </div>
    );
};

export default ProductSite;