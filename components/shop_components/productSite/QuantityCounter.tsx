import React from "react";
import styles from "@/components/shop_components/productSite/productSite.module.css";

type QuantityCounterProps = {
    selectedQuantity: number;
    onQuantityChange: (newQuantity: number) => void;
};

const QuantityCounter = ({ selectedQuantity, onQuantityChange }: QuantityCounterProps) => {

    const handleAddQuantity = (change: number) => {
        const newQuantity = selectedQuantity + change;
        if (newQuantity >= 1) { // zapobiegamy wartości poniżej 1
            onQuantityChange(newQuantity);
        }
    };

    return (
        <div className={styles.quantity}>
            <div onClick={() => handleAddQuantity(-1)} className={styles.quantity_item}>
                -
            </div>
            <div className={styles.quantity_item}>
                {selectedQuantity}
            </div>
            <div onClick={() => handleAddQuantity(1)} className={styles.quantity_item}>
                +
            </div>
        </div>
    );
};

export default QuantityCounter;
