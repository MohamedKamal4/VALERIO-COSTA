import { BiMenu } from "react-icons/bi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { BsPersonFill } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const cartItems = useSelector((state) => state.cart.items);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const btnArr = [
    { name: "Home", path: "/home" },
    { name: "PANTS", path: "/pants" },
    { name: "JACKETS", path: "/jackets" },
    { name: "SHOES", path: "/shoes" },
    { name: "SHIRTS", path: "/shirts" },
    { name: "HOODIES", path: "/hoodies" },
    { name: "T-SHIRTS", path: "/t-shirts" },
    { name: "BEST SELLER", path: "/bestseller" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      navigate("/search/" + inputValue.trim());
      setIsOpen(false);
    }
  };
  const user =  JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));

  return (
    <nav className={`vw-100 ${isOpen ? "vh-100 position-fixed top-0 start-0 bg-white" : ""} ${location.pathname === "/login" || location.pathname === "/register" ? "d-none" : ""}`}>
      <div className="container w-100 d-flex flex-column justify-content-between align-items-center">
        {/* Top bar */}
        <div className="row w-100 d-flex justify-content-between align-items-center py-3">
          <div className="col-6 h-100 d-flex justify-content-start align-items-center">
            <Link to="/home" className="link">
              <p className="text-black fw-bold">VALERIO COSTA</p>
            </Link>
          </div>

          <div className="col-4 icons h-100 d-flex align-items-center justify-content-between" style={{ justifyContent: "end" }}>
          {!user &&
            <Link className="link text-black" to='/login' >
              LOG IN
            </Link>
          }
          {user &&
          <Link
            to={
              user.username === 'admin' ? '/admin/dashboard/products' : '/profile'
            }
            className="border-0 h-100 d-flex justify-content-center align-items-center bg-transparent"
          >
            <BsPersonFill size={15} color="black" />
          </Link> 
          }
          

            <Link to="/cart" className="border-0 h-100 d-flex justify-content-center align-items-center bg-transparent position-relative text-decoration-none">
              <div className="num d-flex gap-1 justify-content-center align-items-center">
                <HiOutlineShoppingBag size={15} color="black" />
                <span className="name-product h-100 text-black" style={{ fontSize: "10px" }}>{cartItems.length}</span>
              </div>
            </Link>

            <button
              className="border-0 h-100 d-flex justify-content-center align-items-center bg-transparent"
              onClick={toggleMenu}
              style={{
                zIndex: 1000,
                transition: "transform 0.3s ease-in-out",
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              {isOpen ? (
                <CgClose size={15} color="black" />
              ) : (
                <BiMenu size={15} color="black" />
              )}
            </button>
          </div>
        </div>

        <div className={`row w-100 ${isOpen ? "open-navbar" : "close-navbar"}`}>
          <ul className="list col-12">
            <form onSubmit={handleSearch} className="w-100 py-3">
              <input
                type="text"
                placeholder="SEARCH"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-100 search-input"
              />
            </form>

            {btnArr.map((btn) => (
              <li key={btn.name}>
                <Link
                  to={btn.path}
                  className={`link ${location.pathname.includes(btn.path) ? "active" : ""}`}
                  onClick={() => setIsOpen(false)} // ⬅ إغلاق المينيو بعد الضغط على الرابط
                >
                  {btn.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
