import { useEffect, useState } from "react";
import { useData } from "../context/contextData";
import { cardData } from "../context/contextCard";
import Cards from "./card";

export default function FormalShoes() {
    const { products } = useData();
    const [FormalShoes, setFormalShoes] = useState([]);

    useEffect(() => {
        const FormalShoes = products.filter((el) => el.category === "Formal Shoes");
        setFormalShoes(FormalShoes);
    }, [products]);

    return (
        <cardData.Provider value={{  data : FormalShoes  }}>
            <Cards />
        </cardData.Provider>
    );
}
