import sql from "better-sqlite3";
import { Products, Product } from "@/app/types/types";


const db = new sql('products.db');

function initDb(db: sql.Database) {
    db.exec(`
        CREATE TABLE IF NOT EXISTS products (
                                                id INTEGER PRIMARY KEY,
                                                name TEXT NOT NULL,
                                                price INTEGER NOT NULL,
                                                size_value INTEGER NOT NULL,
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
            INSERT INTO products (name, price, size_value, size_unit, material,color,clothes_type)
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
            value: row.size_value,
            unit: row.size_unit as "S" | "M" | "L" | "XL"
        },
        material: row.material,
        color: row.color,
        clothes_type: row.clothes_type as "T-shirt"| "Shirt" | "Hat" | "Trousers" | "Hoodie",
    }));

    return products;
}


export async function storeProducts(products: Products): Promise<void> {
    const insert = db.prepare(`
        INSERT INTO products (name, price, size_value, size_unit, material,color,clothes_type)
        VALUES (?, ?, ?, ?, ?,?,?)
    `);

    const insertMany = db.transaction((products: Products) => {
        for (const product of products) {
            insert.run(
                product.name,
                product.price,
                product.size.value,
                product.size.unit,
                product.material,
                product.color,
                product.clothes_type,
            );
        }
    });

    insertMany(products);
}
