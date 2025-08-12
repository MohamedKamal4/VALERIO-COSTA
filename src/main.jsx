import { Route, Routes, Navigate } from "react-router-dom";
import { DataProvider } from "./context/contextData";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AiFillCaretUp } from "react-icons/ai";
import { Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";
import { SquareLoader } from "react-spinners";

// Lazy load components
const Navbar = lazy(() => import("./commponads/navbar"));
const Footer = lazy(() => import("./commponads/footer"));
const BestSeller = lazy(() => import("./commponads/best"));
const FavoritePage = lazy(() => import("./pages/favoritePage"));
const SearchPage = lazy(() => import("./pages/search"));
const AllProducts = lazy(() => import("./pages/allProducts"));
const Home = lazy(() => import("./home"));
const AllPants = lazy(() => import("./pages/allPants"));
const CasualPants = lazy(() => import("./commponads/casualPants"));
const FormalPants = lazy(() => import("./commponads/formalpants"));
const SportsPants = lazy(() => import("./commponads/sportsPants"));
const Jackets = lazy(() => import("./pages/jackets"));
const Shoes = lazy(() => import("./pages/shoes"));
const CasualShoes = lazy(() => import("./commponads/CasualShoes"));
const FormalShoes = lazy(() => import("./commponads/shoesFormal"));
const Shirt = lazy(() => import("./pages/shirts"));
const Hoodies = lazy(() => import("./pages/hoodies"));
const Tshirts = lazy(() => import("./pages/t-shirt"));
const Details = lazy(() => import("./commponads/details"));
const Cart = lazy(() => import("./commponads/cart"));
const Profile = lazy(() => import("./pages/profile"));
const LogIn = lazy(() => import("./commponads/login"));
const Register = lazy(() => import("./commponads/register"));
const AdminDashboard = lazy(() => import("./pages/admin/adminPage"));
const Products = lazy(() => import("./pages/admin/products"));
const Orders = lazy(() => import("./pages/admin/orders"));


const Loading = () => (
  <div className="d-flex justify-content-center align-items-center vh-100">
      <SquareLoader />
  </div>
);

export default function Main() {
const location = useLocation();
  return (
    <main className="main position-relative">
      <Suspense fallback={<Loading />}>
        <Navbar />
      </Suspense>

      <DataProvider>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} >
              <Route path="products" element={<Products />} />
              <Route path="orders" element={<Orders />} />
            </Route>
            <Route path="/bestseller" element={<BestSeller />} />
            <Route path="/bigSale" element={<AllProducts />} />
            <Route path="/search/:title" element={<SearchPage />} />
            <Route path="/favorite" element={<FavoritePage />} />
            <Route path="/pants" element={<AllPants />}>
              <Route path="casual" element={<CasualPants />} />
              <Route path="formal" element={<FormalPants />} />
              <Route path="sports" element={<SportsPants />} />
            </Route>
            <Route path="/jackets" element={<Jackets />} />
            <Route path="/shoes" element={<Shoes />}>
              <Route path="formal" element={<FormalShoes />} />
              <Route path="casual" element={<CasualShoes />} />
            </Route>
            <Route path="/shirts" element={<Shirt />} />
            <Route path="/hoodies" element={<Hoodies />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/t-shirts" element={<Tshirts />} />
            <Route path="/profile" element={<Profile />}/>
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/details/product/:id" element={<Details />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </DataProvider>

      <button
        style={{
          position: "fixed",
          bottom: "20px",
          right: "0px",
          zIndex: 500,
          transition: "transform 0.3s ease-in-out",
          color: "black",
        }}
        className={`btn ${location.pathname === "/login"  || location.pathname.includes('/details')  || location.pathname === "/register" || location.pathname.includes("/admin/dashboard")? "d-none" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <AiFillCaretUp className="arrow-icon" color="black" size={30} />
      </button>

      <Suspense fallback={<Loading />}>
        <Footer />
      </Suspense>
    </main>
  );
}
