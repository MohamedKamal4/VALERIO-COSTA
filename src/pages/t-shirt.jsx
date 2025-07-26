import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { useData } from "../context/contextData";
import { SquareLoader } from "react-spinners";
import { cardData } from "../context/contextCard";
import Cards from "../commponads/card";

export default function  Tshirts() {
    const { products, loading } = useData();
    const [tShirt, setTshirt] = useState([]);
    useEffect(() => { 
          const tShirt = products.filter((el) =>
            el.category === "T-shirt"
          );

         setTshirt(tShirt)
    },[products])



    return (
        <section>
            <div className="tShirt-back vw-100 vh-100" style={{backgroundImage: "url(https://i.pinimg.com/1200x/6a/c7/85/6ac78566a0b4e09c94a0e3e5d10353bf.jpg)"}}>
                <h1 className="text w-100 h-100 d-flex justify-content-center align-items-center">T-SHIRTS</h1>
            </div>
            <div className="container vh-100" style={{ marginTop: "100px" }}>
               {loading === false ?
                    <cardData.Provider value={{  data : tShirt  }}>
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