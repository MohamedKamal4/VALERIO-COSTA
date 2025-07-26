import Cards from "../commponads/card";
import { cardData } from "../context/contextCard";
import { useData } from "../context/contextData";

export default function AllProducts() {
          const pathPrefix = window.location.hostname.includes("github.io") ? "/VALERIO-COSTA-FASHON-SHOP/" : "./";

    const { products } = useData();
    return (
        <section>
            <div className="pants-back vw-100 vh-100" style={{ backgroundImage: `url(${pathPrefix}/assets/images/big.jpg)`, backgroundPosition: "center 60%", backgroundSize: "cover 55%" }}>
                <h1 className="text w-100 h-100 d-flex justify-content-center align-items-center">BIG SALE</h1>
            </div>
            <div className="container py-5 mt-5">
                <cardData.Provider value={{  data : products  }}>
                    <Cards />
                </cardData.Provider>
            </div>
        </section>
    )
}