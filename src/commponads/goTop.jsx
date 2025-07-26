import { AiFillCaretUp } from "react-icons/ai"; 
import { useLocation } from "react-router-dom";
export default function GoTop() {
    const location = useLocation();

    return (
        <button style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 10000000000000000,
            transition: "transform 0.3s ease-in-out",
            color: "black",
            display : location.pathname.includes("/details/product/") || location.pathname === "/home" || location.pathname === "/" ? "none" : "block"
        }}
            className="btn"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        ><AiFillCaretUp className="arrow-icon" color="black" size={30} /></button>
    )
}