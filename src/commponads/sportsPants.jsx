import { useEffect, useState } from "react";
import { useData } from "../context/contextData";
import { cardData } from "../context/contextCard";
import Cards from "./card";

export default function SportsPants() {
    const { products } = useData();
    const [Pants, setPants] = useState([]);

    useEffect(() => {
        const sportspants = products.filter((el) => el.category === "Sports");
        setPants(sportspants);
    }, [products]);

    return (
        <cardData.Provider value={{  data : Pants  }}>
            <Cards />
        </cardData.Provider>
    );
}
