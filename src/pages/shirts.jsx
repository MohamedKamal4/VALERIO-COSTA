import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { useData } from "../context/contextData";
import { SquareLoader } from "react-spinners";
import { cardData } from "../context/contextCard";
import Cards from "../commponads/card";
import AOS from "aos";
import Head from "./headPage";

export default function Shirt() {
    const { products, loading } = useData();
    const [shirt, setShirt] = useState([]);
    useEffect(() => { 
          const shirt = products.filter((el) =>
            el.category === "Shirt"
          );

         setShirt(shirt)
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
            <Head animate={''} name={'SHIRTS'} other={'COLLECTION'} img={`https://i.pinimg.com/1200x/d2/ef/c0/d2efc025ff8224d67c2e76ae60bb03bf.jpg`} />
            <section className="container" style={{ marginTop: "100px" }}>
               {loading === false ?
                    <cardData.Provider value={{  data : shirt  }}>
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