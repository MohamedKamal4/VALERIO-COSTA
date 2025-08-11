import { useEffect , useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { AiFillCaretUp, AiFillCaretDown, AiOutlineLine } from "react-icons/ai";
import { MdOutlineHistory, MdFavorite } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { Alert, Card, CardActionArea, CardMedia } from "@mui/material";
import FavoritePage from "./favoritePage";
import { SquareLoader } from "react-spinners";
import { clearFavorite } from "../features/favoriteSlice";
import { useDispatch } from "react-redux";


export default function Profile() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("fav");
  const [errorMsgContent, setErrorMsgContent] = useState(null);
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();


  const user=  JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));



  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/orders?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => setOrders(data))
        .catch((err) => console.log(err));
    }else{
      navigate("/login")
    }
  }, [user , navigate]);

  const handleLogout = () => {
    setErrorMsgContent(
      <Alert severity="success">LOG OUT SUCCESSFULLY</Alert>
    );
    setTimeout(() => {
      setLoading(true)
      setErrorMsgContent(null)
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      dispatch(clearFavorite());
    }, 1000)

    setTimeout(() => {
      navigate("/login")
    }, 2000);
  };



  const toggleOrderDetails = (id) => {
    setExpandedOrderId((prevId) => (prevId === id ? null : id));
    };
    

const deleteOrder = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/orders/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
      setErrorMsgContent(
        <Alert severity="success">DELETED SUCCESSFULLY</Alert>
      );
      setTimeout(() => {
        setErrorMsgContent(null)
    }, 3000)
    } else {
      setErrorMsgContent(
        <Alert severity="Warning">SOMETHING WENT WRONG</Alert>
      );
      setTimeout(() => {
        setErrorMsgContent(null)
    }, 3000)
      console.error("فشل حذف الطلب");
    }
  } catch (err) {
     setErrorMsgContent(
        <Alert severity="Warning">SOMETHING WENT WRONG</Alert>
      );
      setTimeout(() => {
        setErrorMsgContent(null)
    }, 3000)
    console.error("حدث خطأ أثناء حذف الطلب:", err);
  }
  };
  
 



  return (
    <>
      {user && (
      <section className="vw-100">
              <div className="container py-5">
                {/* Header */}
                <div className="row d-flex justify-content-between align-items-center" style={{ height: "150px" }}>
                  <div className="col-6 h-100 text-black">
                    <h1 className="p-0 m-0">{user.name}</h1>
                    <p>{user.email}</p>
                    <span className="p-0 m-0"># {user.username}</span>
                  </div>
                  <div className="col-6 d-flex flex-column justify-content-center align-items-end gap-3">
                    <button className="btn" style={{ width: "100px" }} onClick={() => setTab("fav")}>
                      <MdFavorite size={18} color={tab === "fav" ? "red" : "black"} />
                    </button>
                    <button className="btn" style={{ width: "100px" }} onClick={() => setTab("history")}>
                      <MdOutlineHistory size={20} color="black" />
                    </button>
                    <button className="btn" style={{ width: "100px" }} onClick={() => setTab("settings")}>
                      <IoIosSettings size={20} color="black" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="row" style={{ minHeight: "310px" }}>
                  {tab === "fav" && <FavoritePage />}
                  {tab === "settings" && (
                    <button className="btn name-product fw-bold text-black" onClick={handleLogout} style={{ width: "200px", height: "50px" }}>
                      <AiOutlineLine size={15} color="black" /> LOG OUT
                    </button>
                  )}

                  {tab === "history" && (
                    <div className="col-12">
                      <div className="w-100 py-4 d-flex justify-content-start align-items-center gap-3">
                        <h4>YOUR ORDERS</h4>
                        <p className="fw-bold text-white bg-black px-2">{orders.length}</p>
                      </div>

                      <div className="w-100 d-flex flex-column justify-content-center align-items-center gap-5">
                        {orders.length === 0 ? (
                          <div className="w-100 d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
                            <p>NO ORDERS YET</p>
                          </div>
                        ) : (
                          orders.map((el) => {
                            const isExpanded = expandedOrderId === el.id;
                            return (
                              <div key={el.id} className="w-100 p-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
                                <div className="row">
                                  <div className="col-10">
                                    <p className="fw-bold" style={{ fontSize: "10px" }}>NAME : {el.name}</p>
                                    <p className="fw-bold" style={{ fontSize: "10px" }}>E - MAIL : {el.email}</p>
                                    <p className="fw-bold" style={{ fontSize: "10px" }}>PHONE : {el.phone}</p>
                                    <p className="fw-bold" style={{ fontSize: "10px" }}>ADDRESS : {el.address}</p>
                                    <p className="fw-bold" style={{ fontSize: "10px" }}>STATUS : {el.status}</p>
                                    <p className="fw-bold" style={{ fontSize: "10px" }}>DATE : {el.date}</p>
                                    <p className="fw-bold" style={{ fontSize: "10px" }}>TOTAL : {el.total} $</p>
                                  </div>
                                  <div className="col-2 d-flex flex-column justify-content-between align-items-end">
                                    <button className="btn text-danger" type="button" onClick={() => deleteOrder(el.id)}>DELETE</button>
                                    <button
                                      className="btn d-flex justify-content-center align-items-center py-0 px-4"
                                      onClick={() => toggleOrderDetails(el.id)}
                                      type="button"
                                    >
                                      {isExpanded ? <AiFillCaretUp size={20} color="black" /> : <AiFillCaretDown size={20} color="black" />}
                                    </button>
                                  </div>
                                </div>

                                {/* Products */}
                                {isExpanded && (
                                  <div className="row gap-4 justify-content-center align-items-center py-3">
                                    {el.products?.map((prod) => (
                                      <div key={prod.id} className="col-3">
                                        <Card style={{ boxShadow: "none", width: "100%" }}>
                                          <CardActionArea>
                                            <Link className="link img-wrapper position-relative" to={`/details/product/${prod.id}`}>
                                              <CardMedia
                                                component="img"
                                                style={{ objectFit: "cover", width: "100%", height: "300px" }}
                                                image={prod.product.MainImage}
                                                alt={prod.product.name}
                                                className="img-card"
                                              />
                                            </Link>
                                            <div className="px-2 py-2 d-flex flex-column justify-content-between align-items-center gap-2">
                                              <p className="name-product w-100 p-0 m-0">{prod.product.name}</p>
                                              <div className="w-100 d-flex justify-content-between align-items-center">
                                                <div className="w-75">
                                                  <div className="w-100 d-flex justify-content-start align-items-center">
                                                    <span className="name-product" style={{ fontSize: "8px" }}>
                                                      QUANTITY : {prod.quantity}
                                                    </span>
                                                  </div>
                                                  <div className="w-100 d-flex justify-content-start align-items-center">
                                                    <span className="name-product" style={{ fontSize: "8px" }}>
                                                      TOTAL : {prod.product.price * prod.quantity} $
                                                    </span>
                                                  </div>
                                                </div>
                                                <div className="w-25">
                                                  <span className="name-product" style={{ fontSize: "8px" }}>
                                                    SIZE : {prod.size}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </CardActionArea>
                                        </Card>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  )}
            </div>
        </div>                      
      </section>
      )}
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
