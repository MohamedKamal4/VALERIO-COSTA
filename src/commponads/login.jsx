import { AiFillEyeInvisible } from "react-icons/ai"; 
import { useEffect, useState } from "react";
import { AiTwotoneEye } from "react-icons/ai"; 
import { Link } from "react-router-dom";
import { Alert } from "@mui/material";
import { MdCheckCircleOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { SquareLoader } from "react-spinners";
export default function LogIn() {
    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(false)
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMsgContent, setErrorMsgContent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData ,setformData] = useState({
        username: "",
        password: ""
    })

    function generateToken(length = 50) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    }
    

    function handleLogin() {
        fetch(`http://localhost:5000/users?username=${formData.username}`)
            .then((res) => res.json())
            .then((data) => {
                    if (data.length > 0) {
                        const user = data[0];
                        if (user.password === formData.password) {
                            const token = generateToken();
                            const storage = rememberMe ? localStorage : sessionStorage;
                            storage.setItem("user", JSON.stringify({ ...user, token }));
                            setErrorMsgContent(
                                <Alert
                                    icon={<MdCheckCircleOutline fontSize="inherit" />}
                                    severity="success"
                                >
                                    YOUR DATA SUCCESSFULLY, PLEASE WAIT...
                                </Alert>
                            );
                            setTimeout(() => {
                                setLoading(true)
                            }, 1000)
                            setTimeout(() => {
                                navigate(`${user.username === "admin" ? "/admin/dashboard" : `/profile/${user.username}`}`)
                            }, 2000);
                        } else {
                            setErrorMsgContent(
                                <Alert severity="error">PASSWORD IS INCORRECT</Alert>
                            );
                        }
                    } else {
                        setErrorMsgContent(
                            <Alert severity="error">USERNAME NOT FOUND</Alert>
                        );
                    }
                })
            .catch((err) => console.log(err));
    }


    useEffect(() => {
        setTimeout(() => {
            setErrorMsgContent(null)
        }, 3000)
    },[errorMsgContent])

    const [icon , setIcon] = useState(null)
    useEffect(() => {
        if (isClicked === true) {
            setIcon(<AiFillEyeInvisible size={15} color="balck"/>)
        }else{
            setIcon(<AiTwotoneEye size={15} color="balck"/>)
        }
    }, [isClicked])
    

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
        <section className="login vw-100 bg-white position-fixed top-0 start-0" >
            <div className="container vh-100 d-flex justify-content-center align-items-center">
                <div className="w-50 form h-100 d-flex justify-content-center align-items-center">
                    <form className="w-75 h-50 d-flex flex-column justify-content-center align-items-center gap-3" onSubmit={(e) => e.preventDefault()}>
                        <div className="w-100">
                            <input
                                value={formData.username}
                                autoComplete="off"
                                required
                                onChange={(e) => setformData({...formData, username: e.target.value})}
                                className="search-input text-black register-input border-black w-100" type="text" placeholder="USER NAME" />
                        </div>
                        <div className="w-100 position-relative">
                            <input
                                autoComplete="off"
                                required
                                value={formData.password}
                                onChange={(e) => setformData({...formData, password: e.target.value})}
                                className="search-input text-black register-input border-black w-100" type={isClicked ? "text" : "password"} placeholder="PASSWORD" />
                            <button type="button" className={`btn ${!formData.password ? "d-none" : ""}`} style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", right: " 0" }}  onClick={() => setIsClicked(!isClicked)}>
                                {icon}
                            </button>
                        </div>
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
                        <div className="w-100 ">
                            <button className="btn w-100 text-white bg-black fw-bold py-2" onClick={handleLogin}>LOG IN</button>
                        </div>
                        <div className="w-100 d-flex justify-content-between align-items-center">
                            <Link to="/register" className="w-100 py-2 link d-flex justify-content-center align-items-center text-black">CREATE ACCOUNT</Link>
                            <Link to="/home" className="w-100 py-2 link d-flex justify-content-center align-items-center text-black">JUST VISITOR</Link>
                        </div>
                    </form>
                </div>
                <div className="w-50 hide-img h-100 d-flex justify-content-center align-items-center" style={{background: "url(https://i.pinimg.com/1200x/a3/21/15/a321156a141477928d9e2fc1c70c9b07.jpg)", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"}}>
                    <h1 className="text-white fw-bold pb-4 px-5 d-flex justify-content-center align-items-center m-0" style={{fontSize: "100px",backgroundColor: "rgba(0, 0, 0, 0.5)" ,backdropFilter: "blur(5px)",WebkitBackdropFilter: "blur(5px)"}}>LOG IN</h1>
                </div>
            </div>
            <div className="d-flex justify-content-center align-items-center position-fixed" style={{left: "20px",bottom: "20px"}}>
                {errorMsgContent}
            </div>
        </section>
        {loading &&
            <div className="d-flex flex-column justify-content-center align-items-center vh-100 vw-100 bg-white" style={{overflow: "hidden" ,top: "0", left: "0", position: "relative",zIndex: "99999999999999999" }}>
                {<SquareLoader />}
            </div>
        }    
    </>
    )
}