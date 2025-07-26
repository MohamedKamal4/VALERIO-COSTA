import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { useData } from "../context/contextData";
import { SquareLoader } from "react-spinners";
import { cardData } from "../context/contextCard";
import Cards from "../commponads/card";

export default function  Hoodies() {
    const { products, loading } = useData();
    const [hoodie, setHoodie] = useState([]);
    useEffect(() => { 
          const hoodie = products.filter((el) =>
            el.category === "Hoodie"
          );

         setHoodie(hoodie)
    },[products])



    return (
        <section >
            <div className="hoodie-back vw-100 vh-100" style={{ backgroundImage: "url(https://i.pinimg.com/1200x/b5/cc/dd/b5ccdd080a37645f40f7bd31d131827f.jpg)" }}>
                <h1 className="text w-100 h-100 d-flex justify-content-center align-items-center">HOODIES</h1>
            </div>
            <div className="container vh-100" style={{ marginTop: "100px" }}>
               {loading === false ?
                    <cardData.Provider value={{  data : hoodie  }}>
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