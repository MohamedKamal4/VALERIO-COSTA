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
            <Head animate={''} name={'BIG SALE'} other={'COLLECTION'} img={`https://i.pinimg.com/1200x/c4/83/11/c48311314ebad9f9efc9adcc7403074d.jpg`} />
            <section className="container py-5 mt-5">
                <cardData.Provider value={{  data : products  }}>
                    <Cards />
                </cardData.Provider>
            </section>
        </>
    )
}