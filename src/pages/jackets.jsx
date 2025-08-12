import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { useData } from "../context/contextData";
import { SquareLoader } from "react-spinners";
import { cardData } from "../context/contextCard";
import Cards from "../commponads/card";
import AOS from "aos";
import Head from "./headPage";

export default function Jackets() {
    const { products, loading } = useData();
    const [jackets, setJackets] = useState([]);
    useEffect(() => { 
          const alljackets = products.filter((el) =>
            el.category === "Jacket"
          );

         setJackets(alljackets)
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
            <Head animate={''} name={'JACKETS'} other={'COLLECTION'} img={`https://i.pinimg.com/1200x/47/6a/66/476a666df31c6a7af530a0bc4880d83c.jpg`} />
            <section className="container" style={{ marginTop: "100px" }}>
               {loading === false ?
                    <cardData.Provider value={{  data : jackets  }}>
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