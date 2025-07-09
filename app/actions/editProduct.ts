"use server"

import { updateProduct } from "@/lib/products";
import {Product} from "@/app/types/types";

export default async function editProduct(data: Product) {
    try {
        const {
            id,
            name,
            price,
            size,
            material,
            color,
            clothes_type
        } = data;

        const productData = {
            id: Number(id),
            name: String(name),
            price: Number(price),
            size: {
                quantity: Number(size.quantity),
                unit: size.unit as "S" | "M" | "L" | "XL"
            },
            material: String(material),
            color: String(color),
            clothes_type: clothes_type as "T-shirt" | "Shirt" | "Hat" | "Trousers" | "Hoodie"
        };

        await updateProduct(productData);
        return { success: true };

    } catch (error) {
        console.error("Error in editProduct:", error);
        return { error: error instanceof Error ? error.message : "Unknown error" };
    }
}
