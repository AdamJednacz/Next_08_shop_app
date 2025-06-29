
import classes from "./shop_page.module.css"
import {getProducts} from "@/lib/products";
const Page = async () => {
    const products = await getProducts();




    return (
        <>

            <ul className="products">
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name}: {product.price}
                    </li>
                ))}
            </ul>
        <h1>
           Fashion
        </h1>
            <div>
                <div className={classes.filters}>

                </div>
                <div className={classes.products}>

                </div>
            </div>
            <div className={classes.navi}>

            </div>
            </>
    );
};

export default Page;