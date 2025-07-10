import React from "react";
import classes from "./filters.module.css";

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
    colorFilter: string | null;
    setColorFilter: (color: string) => void;
    sizeFilter: string | null;
    setSizeFilter: (size: string) => void;
    typeFilter: string | null;
    setTypeFilter: (type: string) => void;
};

const Filters = ({
                     colorFilter,
                     setColorFilter,
                     sizeFilter,
                     setSizeFilter,
                     typeFilter,
                     setTypeFilter
                 }: FiltersProps) => {
    return (
        <div className={classes.filters}>
            <h2>Filters</h2>

            <h3>Sizes</h3>
            <div className={classes.sizes}>
                {["S", "M", "L", "XL"].map((size) => (
                    <div
                        className={`${classes.size} ${sizeFilter === size ? classes.activeSize : ""}`}
                        key={size}
                        onClick={() => setSizeFilter(size)}
                    >
                        {size}
                    </div>
                ))}
            </div>

            <h3>Colors</h3>
            <div className={classes.colors}>
                {Object.entries(colorMap).map(([key, color]) => (
                    <div
                        key={key}
                        className={`${classes.color} ${colorFilter === color ? classes.activeColor : ""}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setColorFilter(color)}
                    />
                ))}
            </div>

            <h3>Type</h3>
            <div className={classes.types}>
                {["T-shirts", "Shirts", "Hats", "Trousers", "Hoodies"].map((type) => (
                    <p
                        className={`${classes.type} ${typeFilter === type ? classes.activeType : ""}`}
                        key={type}
                        onClick={() => setTypeFilter(type)}
                    >
                        {type}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Filters;
