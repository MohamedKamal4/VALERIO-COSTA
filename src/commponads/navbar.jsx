import { AiFillCaretLeft } from "react-icons/ai"; 
import { FaShoppingCart } from "react-icons/fa"; 
import { AiFillHeart } from "react-icons/ai"; 
import { CgClose } from "react-icons/cg"; 
import { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai"; 
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openIcons, setOpenIcons] = useState(false)
  const [length, setLength] = useState({cart:0 , favorites:0})
  const location = useLocation();
  const [inputValue , setInputValue] = useState("")
  const cartItems = useSelector((state) => state.cart.items); 
  const dataFromLocal = useSelector((state) => state.favorite.items);


  useEffect(() => {
    setLength({
    cart: cartItems.length,
    favorites: dataFromLocal.length,
  });
  }, [cartItems, dataFromLocal ])


  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav>
      <ul className={`${isOpen ? "open-navbar" : "close-navbar"}`}>
        <form
          onSubmit={(e) => {
            e.preventDefault(); 
            window.location.href = "/search/" + inputValue;
          }}
          className="w-100 py-5"
        >
          <input
            type="text"
            placeholder="SEARCH"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-100 search-input"
          />
        </form>
        <li><Link className={`link ${location.pathname === "/home" ? "active" : ""}`} to="/home">Home</Link></li>
        <li><Link className={`link ${location.pathname === "/pants" || location.pathname === "/pants/casual" || location.pathname === "/pants/formal" ? "active" : ""}`} to="/pants">PANTS</Link></li>
        <li><Link className={`link ${location.pathname === "/jackets" ? "active" : ""}`} to="/jackets">JACKETS</Link></li>
        <li><Link className={`link ${location.pathname === "/shoes" ? "active" : ""}`} to="/shoes">SHOES</Link></li>
        <li><Link className={`link ${location.pathname === "/shirts" ? "active" : ""}`} to="/shirts">SHIRTS</Link></li>
        <li><Link className={`link ${location.pathname === "/hoodies" ? "active" : ""}`} to="/hoodies">HOODIES</Link></li>
        <li><Link className={`link ${location.pathname === "/t-shirts" ? "active" : ""}`} to="/t-shirts">T-SHIRTS</Link></li>
        <li><Link className={`link ${location.pathname === "/bestseller" ? "active" : ""}`} to="/bestseller">BEST SELLER</Link></li>
      </ul>
      <div className={`${openIcons ? "arrow-close" : "arrow-open" } arrow h-100 d-flex justify-content-center align-items-center`}>
        <button className="btn" onClick={() => setOpenIcons(!openIcons)}
         style={{
            zIndex: 1000,
            transition: "transform 0.3s ease-in-out",
            transform: openIcons ? "rotate(180deg)" : "rotate(0deg)",
          }}
        ><AiFillCaretLeft className="arrow-icon" color={location.pathname.includes("/details/product/") || location.pathname.includes("/cart")  ? "black" : "white"}/></button>
      </div>
      <div className={`${openIcons === true ? "open-icons position-relative" : "close-icons position--absolute" } icons h-100 d-flex align-items-center`}>
        <Link to={"/favorite"} className="border-0 w-25 h-100 d-flex justify-content-center align-items-center bg-transparent">
          <div className="num"
            style={{
              color: location.pathname.includes("/details/product/") || location.pathname.includes("/cart")
                ? "black"
                : "white"
            }}
          >
            <AiFillHeart
              size={20}
              color={location.pathname === "/favorite" ? "red" : "inherit"}
            />
            {length.favorites === 0 ?
              ""
              :
              <span className="lengh name-product rounded-circle" style={{width: "5px",height:"5px", backgroundColor: "red"}}></span>
            }
          </div>
        </Link >

        <Link to="/cart" className="border-0 h-100 w-25 d-flex justify-content-center align-items-center bg-transparent position-relative text-decoration-none">
          <div className="num"
            style={{
              color: location.pathname.includes("/details/product/") || location.pathname.includes("/cart")
                ? "black"
                : "white"
            }}
          >
            <FaShoppingCart
              size={20}
              color='inherit'
            />
            {length.cart === 0 ?
              ""
              :
              <span className="lengh name-product rounded-circle" style={{width: "5px",height:"5px", backgroundColor: "red"}}></span>
            }
          </div>
        </Link>

        <button
          className="border-0 h-100 w-25 d-flex justify-content-center align-items-center bg-transparent"
          onClick={toggleMenu}
          style={{
            zIndex: 1000,
            transition: "transform 0.3s ease-in-out",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          {isOpen ? (
            <CgClose
              size={20}
              color={"white"}
            />
          ) : (
            <AiOutlineMenu size={20}  color={location.pathname.includes("/details/product/" ) || location.pathname.includes("/cart") ? "black" : "white"} />
          )}
        </button>
      </div>
    </nav>
  );
}
