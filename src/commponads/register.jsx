import { useEffect, useState } from "react";
import { AiFillEyeInvisible, AiTwotoneEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Alert } from "@mui/material";
import { MdCheckCircleOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { SquareLoader } from "react-spinners";

export default function Register() {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [isClickedTwo, setIsClickedTwo] = useState(false);
  const [errorMsgContent, setErrorMsgContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataValid, setDataValid] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const icon = isClicked ? <AiFillEyeInvisible size={15} color="black" /> : <AiTwotoneEye size={15} color="black" />;
  const iconTwo = isClickedTwo ? <AiFillEyeInvisible size={15} color="black" /> : <AiTwotoneEye size={15} color="black" />;

  useEffect(() => {
    if (errorMsgContent) {
      const timer = setTimeout(() => {
        setErrorMsgContent(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMsgContent]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch("http://localhost:5000/users")
        .then((res) => res.json())
        .then((data) => {
          const findEl = data.some(
            (el) =>
              el.username === formData.username.trim().toLowerCase() ||
              el.email === formData.email.trim().toLowerCase()
          );
          setDataValid(!findEl);
        })
        .catch((err) => console.log(err));
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.username, formData.email]);

  function generateToken(length = 50) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }

  function handleRegister(e) {
    e.preventDefault();

    const { username, name, email, password, confirmPassword } = formData;

    if (username.includes("admin")) {
      setErrorMsgContent(
        <Alert severity="error">USERNAME NOT ALLOWED</Alert>
      );
      return;
    }
    if (!dataValid) {
      setErrorMsgContent(
        <Alert severity="error">USERNAME OR EMAIL ALREADY EXISTS</Alert>
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsgContent(
        <Alert severity="error">THE PASSWORDS DO NOT MATCH</Alert>
      );
      return;
    }

    if (!username || !name || !email || !password || !confirmPassword) {
      setErrorMsgContent(
        <Alert severity="error">PLEASE FILL IN ALL FIELDS</Alert>
      );
      return;
    }

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.trim().toLowerCase(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        confirmPassword
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const token = generateToken();
        const storage = rememberMe ? localStorage : sessionStorage;

        storage.setItem("user", JSON.stringify({ ...data, token }));

        setErrorMsgContent(
          <Alert
            icon={<MdCheckCircleOutline fontSize="inherit" />}
            severity="success"
          >
            REGISTERED SUCCESSFULLY PLAESE WAIT 
          </Alert>
        );
        
         setTimeout(() => {
            setLoading(true)
        }, 1000)
        setTimeout(() => {
            navigate(`/profile/${data.username}`)
        }, 2000);

        setFormData({
          username: "",
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setIsClicked(false);
        setIsClickedTwo(false);
        setRememberMe(false);
      })
      .catch((err) => {
        console.log(err);
        setErrorMsgContent(
          <Alert severity="error">SOMETHING WENT WRONG. TRY AGAIN.</Alert>
        );
      });
  }

  // const user =
  //     JSON.parse(localStorage.getItem("user")) ||
  //     JSON.parse(sessionStorage.getItem("user"));
  
  //   useEffect(() => {
  //     if (!user && location.pathname !== "/profile/login") {
  //       navigate("/profile/login");
  //     }
  //   }, [user, location.pathname, navigate]);


  useEffect(() => {
  const user =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user"));

  if (user) {
    navigate(user.username === "admin" ? "/admin/dashboard" : `/profile/${user.username}`);
  }
}, [navigate]);


  return (
  <>
    <section
      className="register vw-100 bg-white position-fixed top-0 start-0"
      style={{ zIndex: "7000000" }}
    >
      <div
        className="container vh-100 d-flex justify-content-center align-items-center"
        style={{ marginBottom: "300px" }}
      >
        <div
          className="w-50 hide-img h-100 d-flex justify-content-center align-items-center"
          style={{
            background:
              "url(https://i.pinimg.com/1200x/71/4f/df/714fdffad2aa4146e1997d22c296497b.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h1
            className="text-white fw-bold pb-4 px-5 d-flex justify-content-center align-items-center m-0"
            style={{
              fontSize: "100px",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(5px)",
            }}
          >
            REGISTER
          </h1>
        </div>
        <div
        
         className="w-50 form h-100 d-flex justify-content-center align-items-center">
          <form
            className="w-75 h-50 d-flex flex-column justify-content-center align-items-center gap-3"
            onSubmit={handleRegister}
          >
            <input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="py-4 text-black border-black search-input register-input w-100"
              type="text"
              placeholder="FULL NAME"
            />
            <input
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="text-black py-4 border-black search-input register-input w-100"
              type="text"
              placeholder="USER NAME"
            />
            <input
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="text-black py-4 border-black search-input register-input w-100"
              type="email"
              placeholder="E - MAIL"
            />
            <div className="w-100 d-flex justify-content-between align-items-center gap-3">
              <div className="w-50 position-relative">
                <input
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="text-black border-black search-input register-input w-100"
                  type={isClicked ? "text" : "password"}
                  placeholder="PASSWORD"
                />
                <button
                  type="button"
                  className={`btn ${!formData.password ? "d-none" : ""}`}
                  style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", right: "0" }}
                  onClick={() => setIsClicked(!isClicked)}
                >
                  {icon}
                </button>
              </div>
              <div className="w-50 position-relative">
                <input
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="text-black border-black search-input register-input w-100"
                  type={isClickedTwo ? "text" : "password"}
                  placeholder="CONFIRM PASSWORD"
                />
                <button
                  type="button"
                  className={`btn ${!formData.confirmPassword ? "d-none" : ""}`}
                  style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", right: "0" }}
                  onClick={() => setIsClickedTwo(!isClickedTwo)}
                >
                  {iconTwo}
                </button>
              </div>
            </div>

            {/* ✅ Remember Me checkbox بنقطة سوداء */}
            <div className="form-check w-100 d-flex align-items-center gap-2">
              <input
                className="form-check-input border border-dark"
                type="checkbox"
                style={{
                  appearance: "none",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: rememberMe ? "black" : "white",
                }}
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label className="form-check-label text-black">
                Remember Me
              </label>
            </div>

            <div className="w-100">
              <div className="d-flex justify-content-center align-items-center position-fixed" style={{ right: "20px", bottom: "20px" }}>
                {errorMsgContent}
              </div>
              <button className="btn w-100 text-white bg-black fw-bold py-2" type="submit">
                REGISTER
              </button>
            </div>
            <div className="w-100 d-flex justify-content-between align-items-center">
              <Link to="/login" className="w-100 py-2 link d-flex justify-content-center align-items-center text-black">
                LOG IN
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
    {loading &&
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 vw-100 bg-white" style={{overflow: "hidden" ,top: "0", left: "0", position: "relative",zIndex: "99999999999999999" }}>
            {<SquareLoader />}
        </div>
    }
  </>
  );
}
