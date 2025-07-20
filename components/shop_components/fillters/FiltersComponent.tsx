import React, { Dispatch, SetStateAction } from "react";
import classes from "./filters.module.css";
import { FiltersType } from "@/components/shop_components/FiltersWrapper";

const colorMap: { [key: number]: string } = {
    1: "#FF6C6C",
    2: "#FF7629",
    3: "#FFF06C",
    4: "#9BFF6C",
    5: "#6CF6FF",
    6: "#6CFFDC",
    7: "#6CB9FF",
    8: "#6C7BFF",
    9: "#B66CFF",
    10: "#FC6CFF",
    11: "#000000",
    12: "#F0f0f0"
};

type FiltersProps = {
    filters: FiltersType;
    setFilters: Dispatch<SetStateAction<FiltersType>>;
};

const FiltersComponent = ({ filters, setFilters }: FiltersProps) => {
    const toggleFilter = <T,>(
        array: T[],
        value: T
    ): T[] =>
        array.includes(value) ? array.filter((item) => item !== value) : [...array, value];

    const availableSizes: FiltersType["size_unit"] = ["S", "M", "L", "XL"];
    const availableColors: FiltersType["color"] = [
        "#FF6C6C",
        "#FF7629",
        "#FFF06C",
        "#9BFF6C",
        "#6CF6FF",
        "#6CFFDC",
        "#6CB9FF",
        "#6C7BFF",
        "#B66CFF",
        "#FC6CFF",
        "#000000",
        "#F0f0f0"
    ];
    const availableClothesTypes: FiltersType["clothes_type"] = ["T-shirt", "Shirt", "Hat", "Trousers", "Hoodie"];
    return (
        <div className={classes.filters}>
            <h2>Filters</h2>
            <h3>Sizes</h3>
            <div className={classes.sizes}>
                {availableSizes.map((size) => (
                    <div
                        key={size}
                        className={`${classes.size} ${filters.size_unit.includes(size) ? classes.activeSize : ""}`}
                        onClick={() =>
                            setFilters((prev) => ({
                                ...prev,
                                size_unit: toggleFilter(prev.size_unit, size as FiltersType["size_unit"][number])
                            }))
                        }
                    >
                        {size}
                    </div>
                ))}
            </div>

            <h3>Colors</h3>
            <div className={classes.colors}>
                {availableColors.map((color) => (
                    <span
                        key={color}
                        className={`${classes.color} ${filters.color.includes(color) ? classes.activeColor : ""}`}
                        style={{ backgroundColor: color }}
                        onClick={() =>
                            setFilters((prev) => ({
                                ...prev,
                                color: toggleFilter(prev.color, color as FiltersType["color"][number])
                            }))
                        }
                    />
                ))}
            </div>

            <h3>Type</h3>
            <div className={classes.types}>
                {availableClothesTypes.map((type) => (
                    <p
                        key={type}
                        className={`${classes.type} ${filters.clothes_type.includes(type) ? classes.activeType : ""}`}
                        onClick={() =>
                            setFilters((prev) => ({
                                ...prev,
                                clothes_type: toggleFilter(prev.clothes_type, type as FiltersType["clothes_type"][number])
                            }))
                        }
                    >
                        {type}
                    </p>
                ))}
            </div>

            <h3>Sortowanie ceny</h3>
            <div className={classes.pricesButtons}>
                <button
                    className={filters.sortPrice === "asc" ? "active" : ""}
                    onClick={() =>
                        setFilters(prev => ({
                            ...prev,
                            sortPrice: prev.sortPrice === "asc" ? null : "asc"
                        }))
                    }
                >
                    Od najniższej
                </button>
                <button
                    className={filters.sortPrice === "desc" ? "active" : ""}
                    onClick={() =>
                        setFilters(prev => ({
                            ...prev,
                            sortPrice: prev.sortPrice === "desc" ? null : "desc"
                        }))
                    }
                >
                    Od najwyższej
                </button>
            </div>
        </div>
            );
};

export default FiltersComponent;
