

"use server"

import {deleteProductById, storeProduct, updateProduct} from "@/lib/products";




export default async function deleteProduct(id:number): Promise<{ success: boolean; id?:number; error?: string }> {
    try {
        await deleteProductById(id)
        return { success: true };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : "Unknown error"};
    }
}