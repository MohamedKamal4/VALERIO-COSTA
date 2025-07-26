import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/contextData";
import BestSeller from "../src/commponads/best";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import FavoritePage from "./pages/favoritePage";
import SearchPage from "./pages/search";
import AllProducts from "./pages/allProducts";
import LoadingPage from "./pages/loading";
import ProtectedRoute from "./commponads/ProtectedRoute";
import GoTop from "./commponads/goTop";
import Navbar from "./commponads/navbar";

// تحميل كسول
export const loadApp = () => import("./App");
const App = lazy(loadApp);
const AllPants = lazy(() => import("./pages/allPants"));
const CasualPants = lazy(() => import("./commponads/casualPants"));
const FormalPants = lazy(() => import("./commponads/formalpants"));
const Details = lazy(() => import("./commponads/details"));
const Cart = lazy(() => import("./commponads/cart"));
const SportsPants = lazy(() => import("./commponads/sportsPants"));
const Jackets = lazy(() => import("./pages/jackets"));
const Shoes = lazy(() => import("./pages/shoes"));
const CasualShoes = lazy(() => import("./commponads/CasualShoes"));
const FormalShoes = lazy(() => import("./commponads/shoesFormal"));
const Shirt = lazy(() => import("./pages/shirts"));
const Hoodies = lazy(() => import("./pages/hoodies"));
const Tshirts = lazy(() => import("./pages/t-shirt"));

export default function Main() {
  return (
    <>
    <Navbar />
    <DataProvider>
      <Routes>
        {/* ✅ صفحة البداية بدون حماية */}
        <Route path="/" element={<LoadingPage />} />

        {/* ✅ باقي الصفحات محمية */}
        <Route path="/home" element={
          <ProtectedRoute><App /></ProtectedRoute>
        } />
        <Route path="/bestseller" element={
          <ProtectedRoute><BestSeller /></ProtectedRoute>
        } />
        <Route path="/bigSale" element={
          <ProtectedRoute><AllProducts /></ProtectedRoute>
        } />
        <Route path="/search/:title" element={
          <ProtectedRoute><SearchPage /></ProtectedRoute>
        } />
        <Route path="/favorite" element={
          <ProtectedRoute><FavoritePage /></ProtectedRoute>
        } />

        <Route path="/pants" element={<ProtectedRoute><AllPants /></ProtectedRoute>}>
          <Route path="casual" element={<CasualPants />} />
          <Route path="formal" element={<FormalPants />} />
          <Route path="sports" element={<SportsPants />} />
        </Route>

        <Route path="/jackets" element={<ProtectedRoute><Jackets /></ProtectedRoute>} />
        <Route path="/shoes" element={<ProtectedRoute><Shoes /></ProtectedRoute>}>
          <Route path="formal" element={<FormalShoes />} />
          <Route path="casual" element={<CasualShoes />} />
        </Route>
        <Route path="/shirts" element={<ProtectedRoute><Shirt /></ProtectedRoute>} />
        <Route path="/hoodies" element={<ProtectedRoute><Hoodies /></ProtectedRoute>} />
        <Route path="/t-shirts" element={<ProtectedRoute><Tshirts /></ProtectedRoute>} />
        <Route path="/details/product/:id" element={<ProtectedRoute><Details /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />

        {/* أي مسار غير معروف */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
        <GoTop />
    </DataProvider>
    </>
  );
}
