
import classes from "./shop_page.module.css"
import {getProducts} from "@/lib/products";
import Filters from "@/components/shop_components/Filters";
import Products from "@/components/shop_components/Products";
const Page = () => {



    return (
        <>

            <div className={classes.container}>
            <div className={classes.items}>
                <Filters/>
                <Products/>
            </div>

            <div className={classes.navi}>

            </div>
            </div>
            </>
    );
};

export default Page;