"use server"

import {storeProduct, updateProduct} from "@/lib/products";
import {Product} from "@/app/types/types";



export default async function createProduct(data: Product): Promise<{ success: boolean; product?: Product; error?: string }> {
    try {
        const newProduct = await storeProduct(data);  // storeProduct zwraca produkt z id
        return { success: true, product: newProduct };
    } catch (error) {
        return { success: false, error: error.message};
    }
}