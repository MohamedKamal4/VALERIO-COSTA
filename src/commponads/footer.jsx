export default function Footer() {
  return (
    <footer className="footer bg-white position-relative py-4 w-100" style={{zIndex: "99999"}}>
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
