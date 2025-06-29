"use server"

import {storeProducts} from "@/lib/products";


export default async function createProduct(prevState,formData) {
    const name = formData.get('name');
    const price = formData.get('price');
    const quantity = formData.get('quantity');
    let errors = [];

    if(!name || name.trim().length === 0){
        errors.push('Please enter a name');
    }
    if(!price || price.trim().length === 0){
        errors.push('Please enter a price');
    }
    if(!quantity || quantity.length === 0){
        errors.push('Please enter a quantity');
    }

    if(errors.length > 0){
        return{errors}
    }

    await storeProducts([{ name, price, quantity }]);

    return { success: true };
}
//
// export async function togglePostLikeStatus(postId) {
//     await updatePostLikeStatus(postId,2)
//     revalidatePath('/','layout')
// }
