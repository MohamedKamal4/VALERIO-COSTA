import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { useData } from "../context/contextData";
import { SquareLoader } from "react-spinners";
import { cardData } from "../context/contextCard";
import Cards from "../commponads/card";
import AOS from "aos";
import Head from "./headPage";

export default function  Hoodies() {
    const { products, loading } = useData();
    const [hoodie, setHoodie] = useState([]);
    useEffect(() => { 
          const hoodie = products.filter((el) =>
            el.category === "Hoodie"
          );

         setHoodie(hoodie)
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
            <Head animate={''} name={'HOODIES'} other={'COLLECTION'} img={`https://i.pinimg.com/1200x/f0/01/62/f00162cbb51c12654ac56c2022f515ea.jpg`} />
            <section className="container" style={{ marginTop: "100px" }}>
               {loading === false ?
                    <cardData.Provider value={{  data : hoodie  }}>
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