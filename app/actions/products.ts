"use server"

import {storeProducts} from "@/lib/products";


export default async function createProduct(prevState,formData) {
    const name = formData.get('name');
    const price = formData.get('price');
    const size_value = formData.get('size_value');
    const size_unit = formData.get('size_unit');
    const material = formData.get('material');
    const clothes_type = formData.get('product_type');
    const color = formData.get('product_color');

    let errors = [];

    if(!name || name.trim().length === 0){
        errors.push('Please enter a name');
    }
    if(!price || price.trim().length === 0){
        errors.push('Please enter a price');
    }
    if(!size_value || size_value.length === 0){
        errors.push('Please enter a quantity');
    }
    if(!size_unit || size_unit.length === 0){
        errors.push('Please enter a size unit');

    }
    if(!material || material.length === 0) {
        errors.push('Please enter a material');
    }
    if(! clothes_type ||  clothes_type.length === 0) {
        errors.push('Please enter a clothes type');
    }
    if(! color || color.length === 0) {
        errors.push('Please enter a color');
    }
        if(errors.length > 0){
        return{errors}
    }

    const allowedUnits = ["S", "M", "L", "XL"];
    if (!allowedUnits.includes(size_unit)) {
        errors.push('Invalid size unit');
    }

    await storeProducts([
        {

            name,
            price: Number(price),
            size: {
                value: Number(size_value),
                unit: size_unit
            },
            material,
            color,
            clothes_type


        }
    ]);
    return { success: true };
}
