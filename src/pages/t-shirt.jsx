import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { useData } from "../context/contextData";
import { SquareLoader } from "react-spinners";
import { cardData } from "../context/contextCard";
import Cards from "../commponads/card";
import AOS from "aos";
import Head from "./headPage";

export default function  Tshirts() {
    const { products, loading } = useData();
    const [tShirt, setTshirt] = useState([]);
    useEffect(() => { 
          const tShirt = products.filter((el) =>
            el.category === "T-shirt"
          );

         setTshirt(tShirt)
    },[products])


    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
        });
        }, []);
        
        useEffect(() => {
        AOS.refresh();
    }, []);
            

    return (
    <>
    <Head animate={''} name={'T - SHIRTS'} other={'COLLECTION'} img={`https://i.pinimg.com/1200x/8e/83/c7/8e83c71507f6fd220eccdcbdc800ab0d.jpg`} />
        <section className="container" style={{ marginTop: "100px" }}>
            {loading === false ?
                <cardData.Provider value={{  data : tShirt  }}>
                    <Cards />
                </cardData.Provider>
                :
                <div className="d-flex flex-column justify-content-center align-items-center h-100">
                        {<SquareLoader />}
                </div>
            }
        </section>
    </>
    )
}