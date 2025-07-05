
export interface Size {
    value:number;
    unit:"S" | "M" | "L" | "XL"
}




export interface Product {
    id: number;
    name: string;
    price: number
    size: Size;
    material : string
    color: string;
    clothes_type:"T-shirt"| "Shirt" | "Hat" | "Trousers" | "Hoodie"
}



export interface SoldProduct {
    id: number;
    name: string;
    price: number;
    size:Size;
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