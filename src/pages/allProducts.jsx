import { useEffect } from "react";
import Cards from "../commponads/card";
import { cardData } from "../context/contextCard";
import { useData } from "../context/contextData";
import AOS from "aos";
import Head from "./headPage";

export default function AllProducts() {

    useEffect(() => {
            AOS.init({
              duration: 1000,
              once: false,
            });
          }, []);
          
          useEffect(() => {
            AOS.refresh();
          }, []);

    const { products } = useData();
    return (
        <>
            <Head animate={''} name={'BIG SALE'} other={'COLLECTION'} img={`https://i.pinimg.com/1200x/a4/82/e2/a482e2f437d56647d77ba00448eb7018.jpg`} />
            <section className="container py-5 mt-5">
                <cardData.Provider value={{  data : products  }}>
                    <Cards />
                </cardData.Provider>
            </section>
        </>
    )
}