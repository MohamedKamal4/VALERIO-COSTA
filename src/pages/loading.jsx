import { useEffect } from "react";
import { SquareLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { loadApp } from "../main.jsx";

export default function LoadingPage() {
  const navigate = useNavigate();

    
    useEffect(() => {
    loadApp();
  sessionStorage.setItem("allow", "true");

  const timer = setTimeout(() => {
    navigate("/home");
  }, 6000);

  return () => clearTimeout(timer);
}, [navigate]);



  return (
    <section className="vh-100 d-flex justify-content-center align-items-center flex-column">
      <SquareLoader />
      <p className="name-product text-center p-5">PLEASE WAIT SIX SECONDS</p>
    </section>
  );
}
