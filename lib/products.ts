import sql from "better-sqlite3";
import {Products, Product, ProductColor} from "../types/types";

export type ProductRow = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    size_unit: "S" | "M" | "L" | "XL";
    material: string;
    color: ProductColor;
    clothes_type: "T-shirt" | "Shirt" | "Hat" | "Trousers" | "Hoodie";
};
const db = new sql('products.db');

function initDb(db: sql.Database) {
    db.exec(`
        CREATE TABLE IF NOT EXISTS products (
                                                id INTEGER PRIMARY KEY,
                                                name TEXT NOT NULL,
                                                price INTEGER NOT NULL,
                                                quantity INTEGER NOT NULL,
                                                size_unit TEXT NOT NULL,
                                                material TEXT NOT NULL,
                                                color TEXT NOT NULL,
                                                clothes_type TEXT NOT NULL
        );
    `);

    // Sprawdzenie czy tabela ma dane — jeśli nie, dodaj przykładowy produkt
    const stmt = db.prepare('SELECT COUNT(*) AS count FROM products');
    if (stmt.get().count === 0) {
        db.prepare(`
            INSERT INTO products (name, price, quantity, size_unit, material,color,clothes_type)
            VALUES (?, ?, ?, ?, ?,?,?)
        `).run('Koszulka', 200, 20, "L", "80% cotton","#44f444","T-shirt");
    }
}

initDb(db);



 export async function getProducts(): Promise<Products> {
    const stmt = db.prepare(`SELECT * FROM products`);
    const rows = stmt.all();

    const products: Products = rows.map((row: any): Product => ({
        id: row.id,
        name: row.name,
        price: row.price,
        size: {
            quantity: row.quantity,
            unit: row.size_unit as "S" | "M" | "L" | "XL"
        },
        material: row.material,
        color: row.color,
        clothes_type: row.clothes_type as "T-shirt"| "Shirt" | "Hat" | "Trousers" | "Hoodie",
    }));

    return products;
}


export async function storeProduct(product: Omit<Product, "id">): Promise<Product> {
    const insert = db.prepare(`
        INSERT INTO products (name, price, quantity, size_unit, material, color, clothes_type)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const info = insert.run(
        product.name,
        product.price,
        product.size.quantity,
        product.size.unit,
        product.material,
        product.color,
        product.clothes_type,
    );

    return {
        ...product,
        id: Number(info.lastInsertRowid), // tutaj pobierasz id z bazy
    };
}
export async function updateProduct(product: Product): Promise<void> {
    const stmt = db.prepare(`
        UPDATE products
        SET 
            name = ?, 
            price = ?,
            quantity = ?, 
            size_unit = ?, 
            material = ?, 
            color = ?, 
            clothes_type = ?
        WHERE id = ?
    `);

    stmt.run(
        product.name,
        product.price,
        product.size.quantity,
        product.size.unit,
        product.material,
        product.color,
        product.clothes_type,
        product.id // krytyczne: id musi być przekazane
    );
}

export async function deleteProductById(id: number): Promise<void> {
    const stmt = db.prepare(`DELETE FROM products WHERE id = ?`);
    stmt.run(id);
}

export async function getProductById(id: number): Promise<Product>  {
    const stmt = db.prepare(`SELECT * FROM products WHERE id = ?`);
    const row = stmt.get(id) as ProductRow ;



    const product: Product = {
        id: row.id,
        name: row.name,
        price: row.price,
        size: {
            quantity: row.quantity,
            unit: row.size_unit,
        },
        material: row.material,
        color: row.color,
        clothes_type: row.clothes_type,
    };

    return product;
}
