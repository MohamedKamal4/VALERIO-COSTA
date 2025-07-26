import { useEffect, useState } from "react";
import { useData } from "../context/contextData";
import { cardData } from "../context/contextCard";
import Cards from "./card";

export default function CasualPants() {
    const { products } = useData();
    const [Pants, setPants] = useState([]);

    useEffect(() => {
        const casualpants = products.filter((el) => el.category === "Casual pants");
        setPants(casualpants);
    }, [products]);

    return (
        <cardData.Provider value={{  data : Pants  }}>
            <Cards />
        </cardData.Provider>
    );
}
