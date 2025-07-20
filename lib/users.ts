import sql from "better-sqlite3";
import {User} from "@/types/types";


const db = new sql('users.db');



function initDb(db: sql.Database) {
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
                                             id INTEGER PRIMARY KEY,
                                             email TEXT UNIQUE,
                                             password TEXT NOT NULL,
                                             name TEXT NOT NULL,
                                             surname TEXT NOT NULL,
                                             role TEXT DEFAULT 'user'
        )
    `);

    const adminExists = db.prepare('SELECT 1 FROM users WHERE email = ?').get('admin@example.com');

    if (!adminExists) {

        db.prepare('INSERT INTO users (email, password,name,surname, role) VALUES (?,?,?, ?, ?)').run('admin@example.com', '$2a$10$kKcY.FoVz7OUlZ.4O8QYUeqLUQwV6EsfiEKkiG6ZO.0tRFmKOBy1K', 'Admin','Admin','admin');
    }
}
initDb(db);

export function createUser(email: string, password: string, name: string, surname: string): number {
    const result = db.prepare('INSERT INTO users (email, password, name, surname, role) VALUES (?, ?, ?, ?, ?);')
        .run(email, password, name, surname, 'user');
    return result.lastInsertRowid as number;
}
export function getUserByEmail(email:string) {
    return db.prepare('SELECT * FROM users WHERE email= ?' ).get(email)
}

export function getUserById(id: number) {
    return db.prepare('SELECT id, email, name, surname, role FROM users WHERE id = ?').get(id) as User ;}
