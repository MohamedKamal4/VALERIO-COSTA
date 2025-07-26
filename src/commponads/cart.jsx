import { Link } from "react-router-dom";
import Footer from "./footer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Quantity from "./quantity";
import { useDispatch } from "react-redux";
import { updateQuantity } from "../features/cartSlice/cartSlice";
import FavBtn from "./favBtn";
import GoTop from "./goTop";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const [formState , setFormState] = useState(false)
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState(() => {
  const initial = {};
  cartItems.forEach(item => {
    initial[`${item.id}-${item.size}`] = item.quantity;
  });
  return initial;
});

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  
  const totalPrice = cartItems.map((item) => item.product.price * item.quantity).reduce((a, b) => a + b, 0);

  const handleRemoveFromCart = (id, size) => {
  dispatch({
    type: "cart/removeFromCart",
    payload: { id, size }
  });
};


  return (
    <>
      <section style={{ paddingTop: "100px" }}>
        <div className="container d-flex flex-column justify-content-center align-items-center gap-5">
          <div className="row g-5 w-100 bg-white d-flex justify-content-center align-items-center " style={{position : "relative",zIndex : "10"}} >
            {cartItems.length === 0 ? (
              <div className="col-12 d-flex flex-column justify-content-center align-items-center vh-100">
                <h1 className="name-product text-center">YOUR CART IS EMTY</h1>
              </div>)
              : (
                cartItems.map((item) => {
                  return (
                    <div key={item.id} className=" master-box col-12 d-flex flex-column justify-content-center align-items-center " style={{height: "600px",}}>
                      <div className="cart-box d-flex justify-content-center align-items-center" style={{width: "100%" , height: "100%"}}>
                        <div className="cart-item position-relative px-3" style={{ width: "50%", height: "100%" }}>
                          <Link className="link img-wrapper" to={`/details/product/${item.id}`} style={{ width: "50%",height: "100%" }}>
                            <img className="img-fluid" style={{ objectFit: "cover", width: "100%", height: "100%" }} src={item.product.MainImage} alt="" />
                          </Link>
                        </div>

                        <div className="content-box flex-column px-3 d-flex justify-content-center align-items-center" style={{ width: "50%", height: "100%" }}>
                        <div className="h25 w-100 d-flex justify-content-end align-items-start">
                          <FavBtn data={item.product} />    
                        </div>
                        <div className="text-box w-100 h-75 bg-white d-flex flex-column justify-content-center align-items-start gap-3">
                          <p className="name-product">NAME : {item.product.name}</p>
                          <p className="name-product">SIZE : {item.size}</p>
                          <div className=" d-flex justify-content-between align-items-center w-100">
                            <p className="name-product">QUANTITY : </p>
                              <Quantity
                                count={quantities[`${item.id}-${item.size}`]}
                                setCount={(newCount) => {
                                  if (newCount === 0) {
                                      handleRemoveFromCart(item.id, item.size);
                                    } else {
                                      setQuantities((prev) => ({
                                        ...prev,
                                        [`${item.id}-${item.size}`]: newCount,
                                      }));
                                      dispatch(updateQuantity({
                                        id: item.id,
                                        size: item.size,
                                        newQuantity: newCount,
                                      }));
                                    }
                                }}
                                product={item.product}
                                inStock={item.product.quantity}
                              />

                          </div>
                          <p className="name-product">SELL PRICE : {item.product.price} $</p>
                          <p className="name-product">
                            ORIGINAL PRICE : {" "}
                              <span className="price-product" style={{ fontSize: "10px" }}>{item.product.originalPrice} </span>
                            $
                          </p>
                          <p className="name-product">
                            TOTALE PRICE : {(item.product.price * item.quantity).toFixed(2)} $
                          </p>
                          <button className="btn btn-remove text-white w-100  bg-black rounded-0 mt-4"
                            onClick={() => {
                              handleRemoveFromCart(item.id, item.size)
                            }}
                          >REMOVE</button>
                        </div>
                      </div>
                      </div>
                    </div>
                  )
                })
              )}
          </div>
          <div className={`row w-100 d-flex justify-content-center align-items-center flex-column gap-5 ${formState ? "open-form-inputs" : "close-form-inputs"} `}>
            {cartItems.length > 0 &&
               <div className="col-12 ">
              <form className="d-flex flex-column justify-content-center align-items-center gap-3" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    placeholder="FULL NAME"
                    className="w-100 text-black search-input name border-black"
                    required
                  />
                  <input
                    type="email"
                    placeholder="E - MAIL"
                    className="w-100 text-black search-input name border-black"
                    required
                  />
                  <input
                    type="number"
                    placeholder="NUMBER PHONE"
                    className="w-100 text-black search-input name border-black"
                    required
                  />
                  <input
                    type="text"
                    placeholder="YOUR FULL ADDRESS"
                    className="w-100 text-black search-input name border-black"
                    required
                  />
              </form>
            </div>
             }
            {cartItems.length > 0 ?
              formState === false ? 
              <div className="btn-group w-100 d-flex gap-4 py-3 flex-column justify-content-center align-items-center">
                  <div className="w-100 h-25 d-flex justify-content-between align-items-center">
                    <h3 className="name-product">TOTAL PRICE :</h3>
                    <span className="name-product">{totalPrice.toFixed(2)} $</span>
                  </div>
                  <button className="btn text-white w-100 h-75 bg-black rounded-0" onClick={() => setFormState(true)}>CONFIRM</button>
              </div>
                :
              <div className="btn-group w-100 d-flex gap-4 py-3 flex-column justify-content-center align-items-center">
                  <div className="w-100 h-25 d-flex justify-content-between align-items-center">
                    <h3 className="name-product">TOTAL PRICE :</h3>
                    <span className="name-product">{totalPrice.toFixed(2)} $</span>
                  </div>
                  <button className="btn text-white w-100 h-75 bg-black rounded-0">CHECK OUT</button>
                  <button className="btn text-white w-100 h-75 rounded-0" style={{backgroundColor : "red"}} onClick={() => setFormState(false)}>CANCEL</button>
                </div>
              :
              null
            }
          </div>
        </div>
        <GoTop />
      </section>
      <Footer />
    </>
  );
}
