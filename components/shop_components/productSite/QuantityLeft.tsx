import React from 'react';
import styles from "@/components/shop_components/productSite/productSite.module.css";


interface QuantityProps {
    quantity: number;
}

const QuantityLeft = ({quantity}:QuantityProps) => {
    let color;
    if(quantity < 30)
    {
        color = "red"
    }
    if(quantity > 30 && quantity < 50){
        color = "yellow"
    }if(quantity > 50){
        color = "green"
    }
    return (
        <div className={styles.product_card_text_quantity}>
        <div className={styles.product_card_text_quantity_1} style={{width:`${quantity}%` ,backgroundColor:`${color}` }}>
            {quantity}
        </div>
        <div className={styles.product_card_text_quantity_2}></div>
        </div>
    );
};

export default QuantityLeft;