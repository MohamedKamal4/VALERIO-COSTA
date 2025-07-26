import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { useData } from "../context/contextData";
import { SquareLoader } from "react-spinners";
import { cardData } from "../context/contextCard";
import Cards from "../commponads/card";

export default function Jackets() {
    const { products, loading } = useData();
    const [jackets, setJackets] = useState([]);
    useEffect(() => { 
          const alljackets = products.filter((el) =>
            el.category === "Jacket"
          );

         setJackets(alljackets)
    },[products])



    return (
        <section>
            <div className="jackets-back vw-100 vh-100" style={{ backgroundImage: "url(https://i.pinimg.com/1200x/0e/5a/d4/0e5ad4babeeea0bacb81e6c9576be8ea.jpg)"}}>
                <h1 className="text w-100 h-100 d-flex justify-content-center align-items-center">JACKETS</h1>
            </div>
            <div className="container vh-100" style={{ marginTop: "100px" }}>
               {loading === false ?
                    <cardData.Provider value={{  data : jackets  }}>
                        <Cards />
                    </cardData.Provider>
                    :
                    <div className="d-flex flex-column justify-content-center align-items-center h-100">
                          {<SquareLoader />}
                    </div>
          }
            </div>
        </section>
    )
}