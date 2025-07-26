import Cards from "../commponads/card";
import { cardData } from "../context/contextCard";
import { useData } from "../context/contextData";

export default function AllProducts() {
          const pathPrefix = window.location.hostname.includes("github.io") ? "/VALERIO-COSTA-FASHON-SHOP/" : "./";

    const { products } = useData();
    return (
        <>
            <header className="pants-back vw-100 vh-100" style={{ backgroundImage: `url(https://i.pinimg.com/1200x/1b/08/fc/1b08fc3ce6873285386470ce91b17dd6.jpg)`, backgroundPosition: "center 60%", backgroundSize: "cover 55%" }}>
                <h1 className="text w-100 h-100 d-flex justify-content-center align-items-center">BIG SALE</h1>
            </header>
            <section className="container py-5 mt-5">
                <cardData.Provider value={{  data : products  }}>
                    <Cards />
                </cardData.Provider>
            </section>
        </>
    )
}