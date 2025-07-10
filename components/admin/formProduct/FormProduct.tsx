"use client";
import { Form, Input, InputNumber, Select, Button, message } from "antd";
import { useEffect } from "react";
import classes from "./formProduct.module.css";
import {Product} from "../../../types/types";

const { Option } = Select;


interface FormProductProps {
    values: Product | null;
    onSubmit: (data: any) => void;
    name: string;
    onReset:React.MutableRefObject<() => void>;
}

const colorOptions = [
    "#FF6C6C", "#FF7629", "#FFF06C", "#9BFF6C",
    "#6CF6FF", "#6CFFDC", "#6CB9FF", "#6C7BFF",
    "#B66CFF", "#FC6CFF", "#000000", "#F0f0f0"
] as const;

const FormProduct:React.FC<FormProductProps> = ({  onReset ,  values , onSubmit,name }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (onReset) {
            onReset.current = () => {
                form.resetFields();
            };
        }
    }, [onReset, form]);

    useEffect(() => {
        if (values) {
            form.setFieldsValue({
                id: values.id,
                name: values.name,
                price: values.price,
                quantity: values.size?.quantity,
                size_unit: values.size?.unit || "M",
                clothes_type: values.clothes_type || "T-shirt",
                material: values.material,
                color: values.color || "#000000",
            });
        }
    }, [values, form]);

    //w.w kod ustawia wartości w zależności od tego czy to formularz do nowego produktu czy do edycji poruktu


    const handleFinish = (values: any) => {
        const finalData: Product = {
            id: values.id,
            name: values.name,
            price: values.price,
            material: values.material,
            color: values.color, // mapuj poprawnie
            clothes_type: values.clothes_type, // mapuj poprawnie
            size: {
                unit: values.size_unit, // mapuj poprawnie
                quantity: values.quantity, // mapuj poprawnie
            },
        };

        if (onSubmit) {
            onSubmit(finalData);

        } else {
            console.warn("No onSubmit or action passed.");
        }
    }

    return (
        <>
            <h2 className={classes.h1}>
                {values?.id ? "Edytuj produkt" : "Dodaj produkt"}
            </h2>
            <Form

                form={form}
                name={name}
                className={classes.form}
                layout="vertical"
                onFinish={handleFinish}
            >
                <Form.Item name="id" hidden>
                    <Input type="hidden" />
                </Form.Item>
                <Form.Item
                    name="name"
                    className={classes.form_control}
                    rules={[{ required: true, message: "Please enter product name" }]}
                >
                    <Input placeholder="Enter product name" />
                </Form.Item>

                <Form.Item
                    name="quantity"
                    className={classes.form_control}
                    rules={[{ required: true, message: "Please enter quantity" }]}
                >
                    <InputNumber placeholder="Quantity" min={1} style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item name="size_unit" className={classes.form_control}>
                    <Select>
                        {["S", "M", "L", "XL"].map((size) => (
                            <Option key={size} value={size}>
                                {size}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="clothes_type" className={classes.form_control}>
                    <Select>
                        {["T-shirt", "Shirt", "Hat", "Trousers", "Hoodie"].map((type) => (
                            <Option key={type} value={type}>
                                {type}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="material"
                    className={classes.form_control}
                    rules={[{ required: true, message: "Please enter material" }]}
                >
                    <Input placeholder="Material" />
                </Form.Item>
                <Form.Item name="color" className={classes.form_control}>
                    <Select>
                        {colorOptions.map((color) => (
                            <Option key={color} value={color}>
                                <div
                                    style={{
                                        width: "100%",
                                        height: "24px",
                                        backgroundColor: color,
                                        border: "1px solid #ccc",
                                        borderRadius: "4px",
                                    }}
                                />
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="price"
                    className={classes.form_control}
                    rules={[{ required: true, message: "Please enter price" }]}
                >
                    <InputNumber placeholder="Enter price" min={0} style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {values?.id ? "Zapisz zmiany" : "Dodaj produkt"}
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default FormProduct;
