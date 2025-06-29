import sql from "better-sqlite3";
import {Products,SoldProducts,Product,SoldProduct} from "@/types/types";
const db = new sql('products.db');

function initDb(db: sql.Database) {
    db.exec(`
        CREATE TABLE IF NOT EXISTS products (
                                                id INTEGER PRIMARY KEY,
                                                name TEXT NOT NULL,
                                                price INTEGER NOT NULL,
                                                quantity INTEGER NOT NULL
        );
    `);

    db.exec(`
        CREATE TABLE IF NOT EXISTS sold_products (
                                                     id INTEGER PRIMARY KEY,
                                                     name TEXT NOT NULL,
                                                     price INTEGER NOT NULL,
                                                     quantity INTEGER NOT NULL,
                                                     sold_at TEXT DEFAULT CURRENT_TIMESTAMP,
                                                     buyer_name TEXT NOT NULL,
                                                     buyer_last_name TEXT NOT NULL,
                                                     buyer_email TEXT NOT NULL,
                                                     buyer_phone TEXT NOT NULL,
                                                     buyer_adress TEXT NOT NULL,
                                                     buyer_city TEXT NOT NULL,
                                                     buyer_postal_code TEXT NOT NULL,
                                                     buyer_country TEXT NOT NULL
        );
    `);

    const stmt = db.prepare('SELECT COUNT(*) AS count FROM products');
    if (stmt.get().count === 0) {
        db.prepare(`
      INSERT INTO products (name, price, quantity)
      VALUES (?, ?, ?)
    `).run('Koszulka', 200, 20);
    }
}



initDb(db);

export async function getProducts(): Promise<Products> {
    const stmt = db.prepare(`SELECT * FROM products`);
    const rows = stmt.all() as Products;
    return rows;
}

export async function getSoldProducts(): Promise<SoldProducts> {
    const stmt = db.prepare(`SELECT * FROM sold_products`);
    const rows = stmt.all() as SoldProducts;
    return rows;
}

export async function storeProducts(products: Products): Promise<void> {
    const insert = db.prepare(`
        INSERT INTO products (name, price, quantity)
        VALUES (?, ?, ?)
    `);

    const insertMany = db.transaction((products: Products) => {
        for (const product of products) {
            insert.run(product.name, product.price, product.quantity);
        }
    });

    insertMany(products);
}


export async function storeSoldProducts(soldProducts: SoldProducts): Promise<void> {
    const insert = db.prepare(`
    INSERT INTO sold_products (
      name,
      price,
      quantity,
      buyer_name,
      buyer_last_name,
      buyer_email,
      buyer_phone,
      buyer_adress,
      buyer_city,
      buyer_postal_code,
      buyer_country
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

    const insertMany = db.transaction((products: SoldProducts) => {
        for (const product of products) {
            insert.run(
                product.name,
                product.price,
                product.quantity,
                product.buyer_name,
                product.buyer_last_name,
                product.buyer_email,
                product.buyer_phone,
                product.buyer_address,
                product.buyer_city,
                product.buyer_postal_code,
                product.buyer_country
            );
        }
    });

    insertMany(soldProducts);
}