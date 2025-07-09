"use client";
import React, { useState } from "react";
import classes from "@/components/admin/productsOnShop/porductsOnShop.module.css";

import { Product } from "../../../app/types/types";
import { Modal } from "antd";
import FormProduct from "@/components/admin/formProduct/FormProduct";
import editProduct from "@/app/actions/editProduct";
import createProduct from "@/app/actions/createProduct";

interface ProductsOnShopTableProps {
    products: Product[];
}

const ProductsOnShopTable: React.FC<ProductsOnShopTableProps> = ({ products }) => {
    const [isOpen, setIsOpen] = useState(false); // modal
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // wybrany produkt
    const [modalMode, setModalMode] = useState<"edit" | "add" | null>(null);
    // 🔁 products state so we can live-update the table
    const [localProducts, setLocalProducts] = useState<Product[]>(products ?? []);

    const handleOpenEditModal = (product: Product) => {
        setSelectedProduct(product);
        setModalMode("edit");
        setIsOpen(true);
    };
    const handleOpenAddModal = () => {
        setSelectedProduct(null); // brak danych
        setModalMode("add");
        setIsOpen(true);
    };
    const handleCloseModal = () => {
        setIsOpen(false);
        setSelectedProduct(null);
        setModalMode(null);
    };
    // obłsuga modala


    const handleAddProduct = async (data: Product) => {
        const res = await createProduct(data);

        if (res?.success && res.product) {
            setLocalProducts((prevProducts) => [...prevProducts, res.product!]);
            handleCloseModal();
        } else {
            console.error("Dodawanie nie powiodło się", res?.error);
        }
    };
    const handleEditProduct = async (data: Product) => {

        const res = await editProduct(data);

        if (res?.success) {
            setLocalProducts((prevProducts) =>
                prevProducts.map((p) => (p.id === data.id ? data : p))
            );
            handleCloseModal();
        } else {
            console.error("Edycja nie powiodła się", res?.error);
        }
    };

    return (
        <div>
            <h1>Produkty na sklepie</h1>
            <div className={classes.tableContainer}>
                <table className={classes.table}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nazwa</th>
                        <th>Rodzaj produktu</th>
                        <th>Rozmiar</th>
                        <th>Ilość</th>
                        <th>Materiał</th>
                        <th>Kolor</th>
                        <th>Cena</th>
                        <th>Edytuj</th>
                        <th>Usuń</th>
                    </tr>
                    </thead>
                    <tbody>
                    {localProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.clothes_type}</td>
                            <td>{product.size?.unit}</td>
                            <td>{product.size?.quantity}</td>
                            <td>{product.material}</td>
                            <td>
                                <div
                                    style={{
                                        width: "25px",
                                        height: "25px",
                                        backgroundColor: product.color,
                                    }}
                                ></div>
                            </td>
                            <td>{product.price}</td>
                            <td>
                                    <span
                                        onClick={() => handleOpenEditModal(product)}
                                        className="material-symbols-outlined"
                                    >
                                        edit
                                    </span>
                            </td>
                            <td className={classes.delete}>
                                <span className="material-symbols-outlined">delete</span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button onClick={()=>handleOpenAddModal()}>add</button>
            </div>

            <Modal
                open={isOpen}
                onCancel={handleCloseModal}
                footer={null}
                title={modalMode === "edit" ? "Edytuj produkt" : "Dodaj produkt"}
            >
                <FormProduct
                    key={`${modalMode}-${selectedProduct?.id ?? "new"}`}
                    name={modalMode === "edit" ? "product-form-edit" : "product-form-add"}
                    values={modalMode === "edit" && selectedProduct ? selectedProduct : null}
                    onSubmit={modalMode === "edit" ? handleEditProduct : handleAddProduct}
                />
            </Modal>
            <Modal>
                {/*dodać możliwosć usunięcia danego przedmiotu z bazy */}
            </Modal>
        </div>
    );
};

export default ProductsOnShopTable;
