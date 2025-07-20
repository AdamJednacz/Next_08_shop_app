export type ProductColor =
    | "#FF6C6C"
    | "#FF7629"
    | "#FFF06C"
    | "#9BFF6C"
    | "#6CF6FF"
    | "#6CFFDC"
    | "#6CB9FF"
    | "#6C7BFF"
    | "#B66CFF"
    | "#FC6CFF"
    | "#000000"
    | "#F0f0f0";



export interface Product {
    id: number;
    name: string;
    price: number
    size: {
        quantity:number;
        unit:"S" | "M" | "L" | "XL"
    };
    material : string
    color: ProductColor;
    clothes_type:"T-shirt"| "Shirt" | "Hat" | "Trousers" | "Hoodie"
}



export interface SoldProduct {
    id: number;
    name: string;
    price: number;
    size:  {
        value:number;
        unit:"S" | "M" | "L" | "XL"
    };
    buyer:Buyer
    material : string
}

export interface Buyer {
    buyer_name: string;
    buyer_last_name: string;
    buyer_email: string;
    buyer_phone: string;
    buyer_address: string;
    buyer_city: string;
    buyer_postal_code: string;
    buyer_country: string;
}

export type Products = Product[];
export type SoldProducts = SoldProduct[];


export interface User {
    id: number;
    email: string;
    password: string;
    role: string;
    name: string;
    surname: string;
}