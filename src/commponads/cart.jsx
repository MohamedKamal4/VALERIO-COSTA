import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cartSlice/cartSlice";
import { Alert } from "@mui/material";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const [MsgContent, setMsgContent] = useState(null);
  const [formState, setFormState] = useState(false);

  const user =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user"));

  const [formData, setFormData] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    phone: "",
    address: ""
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const totalPrice = cartItems
    .map((item) => item.product.price * item.quantity)
    .reduce((a, b) => a + b, 0);

  const handleRemoveFromCart = (id, size) => {
    dispatch({
      type: "cart/removeFromCart",
      payload: { id, size }
    });
  };

  function getRandomDateFromSeptember2025() {
    const start = new Date("2025-09-01");
    const end = new Date();
    const randomTime =
      start.getTime() + Math.random() * (end.getTime() - start.getTime());
    const randomDate = new Date(randomTime);
    return randomDate.toISOString();
  }

  const randomId = Math.random().toString(36).substr(2, 10);

  function handledonebtn() {
    if(formData.address === '' || formData.phone === '' || formData.name === '' || formData.email === '') {
      setMsgContent(
          <Alert severity="error">DON'T FORGET TO FILL IN ALL THE FIELDS!</Alert>
      );
       setTimeout(() => {
          setMsgContent(null);
        }, 3000);
    }else{
      fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user ? user.id : `${randomId}`,
        name: formData.name,
        username: user ? user.username : "visitor",
        phone: formData.phone,
        address: formData.address,
        email: formData.email,
        products: cartItems,
        total: totalPrice,
        status: "pending",
        date: getRandomDateFromSeptember2025()
      })
    })
      .then((res) => res.json())
      .then(() => {
        dispatch(clearCart());
        localStorage.setItem("cart", JSON.stringify([]));
        setMsgContent(
            <Alert severity="success">YOUR ORDER HAS BEEN PLACED SUCCESSFULLY </Alert>
        );
        setTimeout(() => {
          setMsgContent(null);
          navigate(user ? "/profile" : "/home");
        }, 3000);
      })
      .catch((err) => console.log(err));
    }
  }

  return (
    <>
      <section className="vw-100" style={{ paddingTop: "100px", paddingBottom: "300px" }}>
        <div className="container d-flex flex-column justify-content-center align-items-center gap-5">
          <div className="row w-100 bg-white">
            {cartItems.length === 0 ? (
              <div className="col-12 d-flex flex-column justify-content-center align-items-center" style={{ marginTop: "200px" }}>
                <h1 className="name-product text-center">YOUR CART IS EMPTY</h1>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="master-box mb-4 col-12 col-sm-6 col-md-4 mb-5 col-lg-3 d-flex flex-column justify-content-between align-items-center"
                  style={{ minHeight: "350px" }}
                >
                  {/* صورة المنتج */}
                  <div className="cart-item position-relative w-100" style={{ height: "300px" }}>
                    <Link className="link img-wrapper" to={`/details/product/${item.id}`}>
                      <img
                        className="img-fluid w-100 h-100"
                        style={{ objectFit: "cover" }}
                        src={item.product.MainImage}
                        alt={item.product.name}
                      />
                    </Link>
                  </div>

                  {/* بيانات المنتج */}
                  <div className="content-box p-3 text-center" style={{ flexGrow: 1 }}>
                    <p className="name-product mb-1">SIZE: {item.size}</p>
                    <p className="name-product mb-1">QUANTITY: {item.quantity}</p>
                    <p className="name-product mb-2">
                      TOTAL: {(item.product.price * item.quantity).toFixed(2)} $
                    </p>
                  </div>

                  {/* زر الإزالة */}
                  <button
                    className="btn btn-remove text-white w-100 bg-black rounded-0"
                    style={{ height: "30px" }}
                    onClick={() => handleRemoveFromCart(item.id, item.size)}
                  >
                    REMOVE
                  </button>
                </div>
              ))
            )}
          </div>

          {/* فورم الدفع */}
          <div className="row w-100 justify-content-center align-items-center flex-column gap-5">
            {cartItems.length > 0 && (
              <div className={`col-12 ${formState ? "open-form-inputs d-flex" : "close-form-inputs d-none"}`}>
                <form className="d-flex w-100 flex-column justify-content-center align-items-center gap-3" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="FULL NAME"
                    className="w-100 text-black search-input name border-black"
                    required
                  />
                  <input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    type="email"
                    placeholder="E - MAIL"
                    className="w-100 text-black search-input name border-black"
                    required
                  />
                  <input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    type="number"
                    placeholder="NUMBER PHONE"
                    className="w-100 text-black search-input name border-black"
                    required
                  />
                  <input
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    type="text"
                    placeholder="YOUR FULL ADDRESS"
                    className="w-100 text-black search-input name border-black"
                    required
                  />
                </form>
              </div>
            )}

            {/* أزرار الدفع */}
            {cartItems.length > 0 && (
              formState === false ? (
                <div className="btn-group w-100 d-flex gap-4 py-3 flex-column justify-content-center align-items-center">
                  <div className="w-100 d-flex justify-content-between align-items-center">
                    <h3 className="name-product">TOTAL PRICE :</h3>
                    <span className="name-product">{totalPrice.toFixed(2)} $</span>
                  </div>
                  <button className="btn text-white w-100 bg-black rounded-0" onClick={() => setFormState(true)}>CONFIRM</button>
                </div>
              ) : (
                <div className="btn-group w-100 d-flex gap-4 py-3 flex-column justify-content-center align-items-center">
                  <div className="w-100 d-flex justify-content-between align-items-center">
                    <h3 className="name-product">TOTAL PRICE :</h3>
                    <span className="name-product">{totalPrice.toFixed(2)} $</span>
                  </div>
                  <button className="btn text-white w-100 bg-black rounded-0" onClick={handledonebtn}>DONE</button>
                  <button className="btn text-white w-100 rounded-0" style={{ backgroundColor: "red" }} onClick={() => setFormState(false)}>CANCEL</button>
                </div>
              )
            )}
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center position-fixed" style={{zIndex: '9999999',left: "20px",bottom: "20px"}}>
            {MsgContent}
        </div>
      </section>
    </>
  );
}
