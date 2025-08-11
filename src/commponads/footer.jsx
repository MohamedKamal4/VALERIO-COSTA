import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  return (
    <footer className={` ${location.pathname === "/login" || location.pathname === "/" || location.pathname === "/register" || location.pathname.includes("/admin") || location.pathname === "/cart" ? "d-none" : ""} ${location.pathname === "/home" ? "showing-footer" : ""} footer bg-white py-4 w-100`}>
      <div className="container d-flex flex-column align-items-center">
        <p className="fw-bold mb-3">JOIN OUR NEWSLETTER</p>
        <ul className="list-unstyled d-flex justify-content-center gap-3 mb-2">
          <li>TIKTOK</li>
          <li>INSTAGRAM</li> 
          <li>FACEBOOK</li>
          <li>X</li>
          <li>PINTEREST</li>
          <li>YOUTUBE</li>
          <li>LINKEDIN</li>
        </ul>
        <ul className="list-unstyled d-flex justify-content-center gap-3">
          <li>COOKIES SETTINGS</li>
          <li>PRIVACY</li>
          <li>TERMS OF USE</li>
        </ul>
      </div>
    </footer>
  );
}
