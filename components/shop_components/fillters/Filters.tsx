import React from 'react';
import classes from "./filters.module.css"

const Filters = () => {
    return (
        <div className={classes.filters}>
         <h2>Filters</h2>
          <h3>Sizes</h3>
            <div className={classes.sizes}>
          <div className={classes.size}>S</div>
          <div className={classes.size}>M</div>
          <div className={classes.size}>L</div>
          <div className={classes.size}>XL</div>
            </div>
            <h3>Colors</h3>
            <div className={classes.colors}>
                {[1, 2, 3, 4, 5, 6,7,8,9,10].map((num) => (
                    <div key={num} className={`${classes.color} ${classes['color' + num]}`}></div>
                ))}

            </div>
            <h3>Type</h3>
            <div className={classes.types}>
                <p className={classes.type}>T-shirts</p>
                <p className={classes.type}>Shirts</p>
                <p className={classes.type}>Hats</p>
                <p className={classes.type}>Trousers</p>
                <p className={classes.type}>Hoodies</p>
            </div>
        </div>
    );
};

export default Filters;