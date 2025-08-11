import { Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate , useLocation } from "react-router-dom";
import { SquareLoader } from "react-spinners";

export default function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMsgContent, setErrorMsgContent] = useState(null);
  const [loading, setLoading] = useState(false);


  const user =  JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));
  
  

  useEffect(() => {
    if (!user || user.username !== "admin") {
    navigate("/login")
  }

    if(location.pathname === "/admin/dashboard"){
      navigate("/admin/dashboard/products")
    }
  }, [navigate, location.pathname,user])
  
  const handleLogout = () => {
      setErrorMsgContent(
        <Alert severity="success">LOG OUT SUCCESSFULLY</Alert>
      );
      setTimeout(() => {
        setLoading(true)
        setErrorMsgContent(null)
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
      }, 1000)
      setTimeout(() => {
        navigate("/login")
      }, 2000);
    };

  return (
    <>
      <section className="container-fluid d-flex justify-content-start align-items-start bg-white vw-100" style={{height: "90vh" ,overflow: "auto"}}>
        <div style={{position: "sticky" , top: "0" , left: "0" ,height: "100%" , width: "20%" , backgroundColor: "rgb(245 245 245)"}}>
          <ul className="w-100 pt-5">
            <li className="px-5 py-1"><Link className="link text-black" style={{fontSize: location.pathname === "/admin/dashboard/products" ? "20px" : "15px" , fontWeight: location.pathname === "/admin/dashboard/products" ? "bold" : "normal" }} to="/admin/dashboard/products" >PRODUCTS</Link></li>
            <li className="px-5 py-1"><Link className="link text-black" style={{fontSize: location.pathname === "/admin/dashboard/orders" ? "20px" : "15px" , fontWeight: location.pathname === "/admin/dashboard/orders" ? "bold" : "normal" }}  to="/admin/dashboard/orders" >ORDERS</Link></li>
            <li className="px-5 py-1"><button className="link btn p-0" style={{color: "red"}} onClick={handleLogout}>LOG OUT</button></li>
          </ul>
        </div>
        <div className="w-75 px-4">
          <Outlet />
        </div>
      </section>
      <div className="d-flex justify-content-center align-items-center position-fixed" style={{left: "20px",bottom: "20px"}}>
        {errorMsgContent}
      </div>
      {loading &&
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 vw-100 bg-white" style={{overflow: "hidden" ,top: "0", left: "0", position: "fixed",zIndex: "99999999999999999" }}>
            {<SquareLoader />}
        </div>
      }    
    </>
  );
}
