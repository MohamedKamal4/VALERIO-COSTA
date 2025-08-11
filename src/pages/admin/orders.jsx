import { Alert, Card, CardActionArea, CardMedia, Divider } from "@mui/material";
import { useEffect, useState } from "react"
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Orders(){
    const [data , setData] = useState([]);
    const [orders, setOrders] = useState([]);
    const [who , setWho] = useState('customer');
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const [MsgContent, setMsgContent] = useState(null);

    
    const toggleOrderDetails = (id) => {
        setExpandedOrderId((prevId) => (prevId === id ? null : id));
    };
        


    useEffect(() => {
        fetch('http://localhost:5000/orders')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setData(data)
        })
        .catch((err) => {
            console.error('Error:', err);
        })
    },[])

    useEffect(() => {
        const customer = data.filter((el) => el.username !== 'visitor')
        const visitor = data.filter((el) => el.username === 'visitor')
        if(who === 'customer'){
            setOrders(customer)
        }else{
            setOrders(visitor)
        }
    },[who, data])



    const total = orders.reduce((acc, order) => acc + order.total, 0);
    console.log(total)


    const deleteOrder = async (id) => {
      try {
        const res = await fetch(`http://localhost:5000/orders/${id}`, {
          method: "DELETE",
        });
    
        if (res.ok) {
          setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
          setMsgContent(
            <Alert severity="success">DELETED SUCCESSFULLY</Alert>
          );
          setTimeout(() => {
            setMsgContent(null)
        }, 3000)
        } else {
          setMsgContent(
            <Alert severity="Warning">SOMETHING WENT WRONG</Alert>
          );
          setTimeout(() => {
            setMsgContent(null)
        }, 3000)
          console.error("فشل حذف الطلب");
        }
      } catch (err) {
         setMsgContent(
            <Alert severity="Warning">SOMETHING WENT WRONG</Alert>
          );
          setTimeout(() => {
            setMsgContent(null)
        }, 3000)
        console.error("حدث خطأ أثناء حذف الطلب:", err);
      }
      };

    function handleDoneBtn(id) {
    fetch(`http://localhost:5000/orders/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'done' }),
    })
        .then((res) => {
            if (!res.ok) throw new Error('Failed to update status');
            return res.json();
        })
        .then((updatedOrder) => {
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === id ? { ...order, status: 'done' } : order
                )
            );
            setMsgContent(<Alert severity="success">MARKED AS DONE</Alert>);
            setTimeout(() => setMsgContent(null), 3000);
        })
        .catch((err) => {
            console.error(err);
            setMsgContent(<Alert severity="error">FAILED TO UPDATE</Alert>);
            setTimeout(() => setMsgContent(null), 3000);
        });
}

console.log(orders)


    return(
        <div className="w-100">
            <div className="row justify-content-between align-items-center flex-wrap" style={{position: 'sticky' , top: '0' ,background: 'white' ,zIndex: '9999999'}}>
                <div className="col-4">
                    <h2 className="text-black">ORDERS</h2>
                </div>
                <ul className="col-4 d-flex justify-content-center align-items-center m-0 py-3 rounded-pill" style={{ backgroundColor: "rgb(245 245 245)" }}>
                    <li className="px-4 text-black"><button onClick={() => {
                        setWho('customer')
                    }} className="border-0 bg-transparent" style={{ fontSize: who === 'customer' ? "15px" : "12px", fontWeight: who === 'customer' ? "bold" : "normal" }}>CUSTOMER</button></li>
                    <li className="px-4 text-black"><button onClick={() => {
                        setWho('visitor')
                    }} className="border-0 bg-transparent"  style={{ fontSize: who === 'visitor' ? "15px" : "12px", fontWeight: who === 'visitor' ? "bold" : "normal" }}>VISITOR</button></li>
                </ul>
                <div className="col-12 py-3 d-flex justify-content-between align-items-center">
                    <p className="name-product">TOTAL ORDERS: {orders.length}</p>
                    <p className="name-product">TOTAL AMOUNT : {total} $</p>
                </div>
            </div>
            <div className="w-100 d-flex justify-content-center align-items-center flex-column gap-5">
                <div className="w-100">
                    <div className="w-100 py-4">
                        <Divider className="text-black" textAlign="left">PINDENG</Divider>
                    </div>
                    {orders.filter((el) => el.status === "pending").length === 0 ? (
                        <div className="w-100 d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
                        <p>NO ORDERS YET</p>
                        </div>
                    ) : (
                        <div className="w-100 d-flex gap-5 flex-column justify-content-center align-items-center">
                            {orders.filter((el) => el.status === "pending").map((el, index) => {
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
                                            <div className="d-flex justify-content-between align-items-center">
                                                <button className="btn text-black" type="button" onClick={() => deleteOrder(el.id)}>CANCEL</button>
                                                <button className="btn text-black" type="button" onClick={() => handleDoneBtn(el.id)}>DONE</button>
                                            </div>
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
                                            <div className="row g-5 justify-content-center align-items-center py-3">
                                            {el.products?.map((prod) => (
                                                <div key={prod.id} className="col-4 mt-5">
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
                            })} 
                        </div>
                    )}
                </div>
                <div className="w-100">
                    <div className="w-100 py-4">
                        <Divider className="text-black" textAlign="left">DONE</Divider>
                    </div>
                    {orders.filter((el) => el.status === "done").length === 0 ? (
                        <div className="w-100 d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
                            <p>NO ORDERS YET</p>
                        </div>
                    ) : (
                        <div className="w-100 d-flex gap-5 flex-column justify-content-center align-items-center">
                            {orders.filter((el) => el.status === "done").map((el, index) => {
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
                            })} 
                        </div>
                    )}
                </div>
            </div>

            <div className="d-flex justify-content-center align-items-center position-fixed" style={{left: "20px",bottom: "20px"}}>
                {MsgContent}
            </div>
        </div>
    )
}