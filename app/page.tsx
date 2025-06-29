import Button from "@/components/design components/Button";
import Header from "@/components/design components/Header";


export default function Page() {
    return (

        <div className="container">
            <h1>Strona główna</h1>
            <div className="grid-container">
                <div className="grid-item item_1"><img src="/men.png" alt="men" /></div>
                <div className="grid-item item_2">
                    <img className="img_2 " src="/woman_2.png" alt="woman" />
                    <h1 className="title">ULTIMATE</h1>
                    <h2 className="outline">SALE</h2>
                    <p className="subtitle">NEW COLLECTION</p>
                    <Button text={"SHOP NOW"} link={"/shop_page"}/>
                    <img className="img_3" src="/woman.png" alt="woman" />
                </div>
                <div className="grid-item item_3"><img src="/men_2.png" alt="men" /></div>
            </div>
        </div>

    );
}