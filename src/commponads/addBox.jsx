import { useState, useEffect } from "react";
import { addToCart, removeFromCart } from "../features/cartSlice/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Quantity from "./quantity";
import FavBtn from "./favBtn";

export default function AddBox({ product, sizes }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [count, setCount] = useState(0);
  const [inStock, setInStock] = useState(product.quantity);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (selectedSize) {
      const existing = cartItems.find(
        (item) => item.id === product.id && item.size === selectedSize
      );
      if (existing) {
        setCount(existing.quantity);
      } else {
        setCount(0);
      }
    }
  }, [selectedSize, cartItems, product.id]);

  useEffect(() => {
    const productById = cartItems.filter((item) => item.id === product.id);
    const quantityInStock = productById.map((item) => {
      return item.quantity;
    }).reduce((a, b) => a + b, 0);
      setInStock(product.quantity - quantityInStock)
  }, [cartItems, product.quantity, product.id])
  


  const handleAddToCart = () => {
    if (!selectedSize) {
      setError("PlEASE CHOOSE A SIZE");
      return;
    }

    if (count === 0) {
      setError("PLEASE CHOOSE A QUANTITY");
      return;
    }

    setError(null);

    dispatch(
      addToCart({
        id: product.id,
        productData: product,
        size: selectedSize,
        quantity: count,
      })
    );
  };


const handleUpdateQuantity = () => {
  if (!selectedSize) return;
  if (count === 0) return;

  const otherSizesCount = cartItems
    .filter(item => item.id === product.id && item.size !== selectedSize)
    .reduce((acc, item) => acc + item.quantity, 0);

  const maxAvailable = product.quantity - otherSizesCount;

  if (count > maxAvailable) {
    alert(`Only ${maxAvailable} left in stock.`);
    return;
  }

  dispatch(removeFromCart({ id: product.id, size: selectedSize }));

  dispatch(
    addToCart({
      id: product.id,
      productData: product,
      size: selectedSize,
      quantity: count,
    })
  );
};



  const handleRemoveFromCart = () => {
  if (!selectedSize) return;

  const existing = cartItems.find(
    (item) => item.id === product.id && item.size === selectedSize
  );

  if (!existing) return;

  if (count < existing.quantity) {
    // قلل الكمية فقط
    const updatedQuantity = count;

    // إزالة المنتج أولاً
    dispatch(removeFromCart({ id: product.id, size: selectedSize }));

    // إعادة إضافته بالكمية المحدثة
    dispatch(
      addToCart({
        id: product.id,
        productData: product,
        size: selectedSize,
        quantity: updatedQuantity,
      })
    );

  } else {
    dispatch(removeFromCart({ id: product.id, size: selectedSize }));
    setCount(0);
  }
};


  const existingItem = selectedSize
    ? cartItems.find(
        (item) => item.id === product.id && item.size === selectedSize
      )
    : null;

  
  const isQuantityChanged =
    existingItem && count !== existingItem.quantity;

  
  
 
  
  
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  
    useEffect(() => {
      const handleResize = () => setScreenWidth(window.innerWidth);
  
      window.addEventListener("resize", handleResize);
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    const content =
      screenWidth > 993 ? (
        <div className="col-6 d-flex flex-column gap-4 justify-content-center align-items-center">
      <div className="add-box w-100 h-50 p-4 d-flex flex-column align-items-center">
        <h5 className="w-100 brand-name" style={{ color: "black", fontWeight: "100" }}>
          {product.name}
        </h5>

        <div className="price-box d-flex justify-content-center flex-column align-items-center w-100 py-2">
            <div className="price d-flex w-100 gap-3">
              <span className="price-product">{product.originalPrice} $</span>
              <span className="name-product originalPrice-price" style={{ fontSize: "8px" }}>
                {product.price} $
              </span>
            </div>
          <div className="d-flex w-100 d-flex justify-content-between align-items-center">
            <span className="name-product stock-product w-50" style={{ fontSize: "8px" }}>
              {inStock === 0 ? (
                  "OUT OF STOCK"
                ) : (
                  `IN STOCK ${inStock}`
                )}
            </span>
            <Quantity count={count} setCount={setCount} product={product} inStock={inStock} />
          </div>
        </div>

        <div
          className="btn-box d-flex justify-content-between gap-1 align-items-center w-100 p-1"
          style={{ height: "50px" }}
        >
          {sizes.map((size) => (
            <button
              key={size}
              className={`bg-transparent ${selectedSize === size ? "btn-size" : ""}`}
              style={{
                fontSize: "10px",
                letterSpacing: "2px",
                border: "unset",
                width: "40px",
                height: "100%",
                color: "black",
              }}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        <div className=" d-flex w-100 mt-2 justify-content-between align-items-center">
          <div className="btn-add bg-black" style={{width : "85%"}}>
            <button
              className="btn text-white w-100 rounded-0 h-100 d-flex justify-content-center align-items-center"
              disabled={!selectedSize || count === 0}
              onClick={
                existingItem
                  ? isQuantityChanged
                    ? handleUpdateQuantity
                    : handleRemoveFromCart
                  : handleAddToCart
              }
            >
              {existingItem
                ? isQuantityChanged
                  ? "UPDATE QUANTITY"
                  : "REMOVE FROM CART"
                : "ADD TO CART"}
            </button>
          </div> 
          <FavBtn data={product}/>
          </div>


        {/* رسالة خطأ */}
        {error && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">{error}</Alert>
          </Stack>
        )}

        {existingItem && (
          <div className="mt-2 text-center" style={{ fontSize: "10px", color: "green" }}>
            Already in cart: Size <b>{existingItem.size}</b>, Quantity: <b>{existingItem.quantity}</b>
          </div>
        )}
      </div>
    </div>
      ) : (
      <div className="bg-white position-fixed bottom-0 left-0 d-flex flex-column gap-4 justify-content-center align-items-center" style={{width: "100%"}}>
        <div className="add-box w-100 h-50 d-flex flex-column align-items-center">
          <div className="price-box flex-column d-flex justify-content-between align-items-center w-100 py-2">
            <div className="d-flex justify-content-between align-items-center w-100">
              <div className="w-75 p-3 d-flex justify-content-start gap-3 align-items-center">
                <span className="price-product price-card" style={{ fontSize: "12px" }}>{product.originalPrice} $</span>
                <span className="name-product originalPrice-price" style={{ fontSize: "12px" }}>
                  {product.price} $
                </span>
              </div>
              <FavBtn data={product} />
            </div>
            <div className="px-3 d-flex w-100 justify-content-between align-items-center gap-1 ">
              <span className="name-product w-50 stock-product " style={{ fontSize: "8px" }}>
                {inStock === 0 ? (
                  "OUT OF STOCK"
                ) : (
                  `IN STOCK ${inStock}`
                )}
              </span>
                <Quantity count={count} setCount={setCount} product={product} inStock={inStock} />
            </div>
          </div>

          <div
            className="btn-box d-flex justify-content-between gap-1 align-items-center w-100 p-1"
            style={{ height: "50px" }}
          >
            {sizes.map((size) => (
              <button
                key={size}
                className={`bg-transparent ${selectedSize === size ? "btn-size" : ""}`}
                style={{
                  fontSize: "10px",
                  letterSpacing: "2px",
                  border: "unset",
                  width: "40px",
                  height: "100%",
                  color: "black",
                }}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

              
            {error && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="error">{error}</Alert>
            </Stack>
          )}

          {existingItem && (
            <div className="mt-2 text-center" style={{ fontSize: "10px", color: "green" }}>
              Already in cart: Size <b>{existingItem.size}</b>, Quantity: <b>{existingItem.quantity}</b>
            </div>
          )}

          <div className=" d-flex w-100 mt-2 justify-content-between align-items-center">
            <div className="btn-add bg-black w-100">
              <button
                className="btn text-white w-100 rounded-0 h-100 d-flex justify-content-center align-items-center"
                disabled={!selectedSize || count === 0}
                onClick={
                  existingItem
                    ? isQuantityChanged
                      ? handleUpdateQuantity
                      : handleRemoveFromCart
                    : handleAddToCart
                }
              >
                {existingItem
                  ? isQuantityChanged
                    ? "UPDATE QUANTITY"
                    : "REMOVE FROM CART"
                  : "ADD TO CART"}
              </button>
            </div> 
            </div>          
        </div>
      </div>
           
      );
  
  return (
    <>
      {content}
    </>
  );
}
