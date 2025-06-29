


export interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
}



export interface SoldProduct {
    id: number;
    name: string;
    price: number;
    quantity: number;
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