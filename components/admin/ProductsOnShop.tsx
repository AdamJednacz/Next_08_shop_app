import React from 'react';
import { getProducts } from "@/lib/products";
import classes from "./porductsOnShop.module.css";

const ProductsOnShop = async () => {
    const products = await getProducts();

    return (
        <div>
            <h1>Produkty na sklepie</h1>
        <div className={classes.tableContainer}>
            <table className={classes.table}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nazwa</th>
                    <th>Cena</th>
                    <th>Ilość</th>
                    <th>Rozmiar</th>
                    <th>Materiał</th>
                    <th>Edytuj</th>
                    <th>Usuń</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price} PLN</td>
                        <td>{product.size.value}</td>
                        <td>{product.size.unit}</td>
                        <td>{product.material}</td>
                        <td><span className="material-symbols-outlined">
edit
</span></td>
                        <td className={classes.delete}>
  <span className={`material-symbols-outlined `}>
    delete
  </span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default ProductsOnShop;
