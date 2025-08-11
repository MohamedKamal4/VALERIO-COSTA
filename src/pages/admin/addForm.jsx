import { AiOutlineClose } from "react-icons/ai";
import { MdCheckCircleOutline } from "react-icons/md";
import { Alert } from "@mui/material";

export default function AddForm({isValid,formData,setMsgContent,setData,setOpenForm,setFormData,openForm,Btns}){
    const productSizes = ["L", "M", "S", "XL", "XXL", "30", "31", "32", "33", "34", "36", "38"];

     function handleSaveBtn() {
        if (isValid) {
            fetch('http://localhost:5000/products', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    brand: "VALERIO COSTA",
                    quantity: formData.quantity,
                    discription: formData.discription,
                    price: formData.price,
                    originalPrice: formData.originalPrice,
                    currency: "USD",
                    soldCount: formData.soldCount,
                    sizes: formData.sizes,
                    images: [formData.imageOne, formData.imageTwo],
                    inStock: true,
                    category: formData.category,
                    MainImage: formData.MainImage
                }),
            })
                .then((res) => res.json())
                .then((newProduct) => {
                    setData(prev => [...prev, newProduct]);
                    setMsgContent(
                        <Alert icon={<MdCheckCircleOutline fontSize="inherit" />} severity="success">
                            Product added successfully.
                        </Alert>
                    );
                    setOpenForm(false);
                    setFormData({ 
                        name: "",
                        quantity: 0,
                        discription: "",
                        price: 0,
                        originalPrice: 0,
                        sizes: [],
                        soldCount: Math.floor(Math.random() * 500),
                        imageOne: "",
                        imageTwo: "",
                        MainImage: "",
                        category: "",
                        inStock: true,
                    });
                })
                .catch((error) => {
                    console.log(error);
                    setMsgContent(
                        <Alert icon={<MdCheckCircleOutline fontSize="inherit" />} severity="error">
                            Something went wrong.
                        </Alert>
                    );
                });
        } else {
            setMsgContent(
                <Alert icon={<MdCheckCircleOutline fontSize="inherit" />} severity="error">
                    Invalid form data.
                </Alert>
            );
        }
    }
    
    const handleSizeClicked = (el) => {
        if (formData.sizes.includes(el)) {
            setFormData((prev) => ({
                ...prev,
                sizes: prev.sizes.filter((size) => size !== el),
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                sizes: [...prev.sizes, el],
            }));
        }
    };
       
    
    return (
        openForm && (
                <div className="position-fixed top-0 start-0 vw-100 vh-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50" style={{ zIndex: 1050 }}>
                    <div className="d-flex w-75 h-75 justify-content-center align-items-center" style={{ backgroundColor: "#ffffff8a", backdropFilter: "blur(5px)", WebkitBackdropFilter: "blur(5px)" }}>
                        <div style={{ width: "40%" }} className="h-100 py-4 d-flex justify-content-center align-items-center">
                            {formData.MainImage ? (
                                <img className="w-75 h-100" src={formData.MainImage} alt="" />
                            ) : (
                                <div className="w-75 h-100 bg-black text-white d-flex justify-content-center align-items-center">
                                    <p>VALERIO COSTA</p>
                                </div>
                            )}
                        </div>
                        <div style={{ width: "60%" }} className="h-100">
                            <form className="p-4 w-100 d-flex flex-column gap-3">
                                <div className="w-100 d-flex justify-content-end">
                                    <button type="button" className="btn" onClick={() => setOpenForm(false)}>
                                        <AiOutlineClose size={20} color="black" />
                                    </button>
                                </div>
                                <div className="w-100 gap-2 d-flex justify-content-center align-items-center">
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="NAME"
                                        style={{ backgroundColor: "rgb(245 245 245)" }}
                                        className=" px-3 search-input text-black border-0 w-75"
                                    />
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-25 px-2 h-100 search-input py-3 text-black border-0"
                                        style={{ backgroundColor: "rgb(245 245 245)" }}
                                    >
                                        {Btns.slice(1).map((el) => (
                                            <option key={el} value={el.toLowerCase()}>
                                                {el}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <textarea
                                    className="search-input text-black border-0 w-100 px-3 pt-2"
                                    rows="4"
                                    value={formData.discription}
                                    onChange={(e) => setFormData({ ...formData, discription: e.target.value })}
                                    placeholder="DESCRIPTION"
                                    style={{ resize: "none", backgroundColor: "rgb(245 245 245)" }}
                                />
                                <div className="d-flex gap-3" >
                                    <div>
                                        <label style={{fontSize: '10px'}} htmlFor="op">ORIGINAL PRICE</label>
                                        <input
                                            id="op"
                                            type="number"
                                            value={formData.originalPrice}
                                            onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                                            style={{ backgroundColor: "rgb(245 245 245)", height: '30px' }}
                                            className=" px-3 py-0 search-input text-black border-0 w-100"
                                        />
                                    </div>
                                    <div>
                                        <label style={{fontSize: '10px'}} htmlFor="p">PRICE WITH DISCOUNT</label>
                                        <input
                                            id="p"
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            style={{ backgroundColor: "rgb(245 245 245)", height: '30px' }}
                                            className=" px-3 py-0 search-input text-black border-0 w-100"
                                        />
                                    </div>
                                    <div>
                                        <label style={{fontSize: '10px'}} htmlFor="q">QUANTITY</label>
                                        <input
                                            id="q"
                                            type="number"
                                            value={formData.quantity}
                                            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                            style={{ backgroundColor: "rgb(245 245 245)", height: '30px' }}
                                            className=" px-3 py-0 search-input text-black border-0 w-100"
                                        />
                                    </div>
                                </div>
                                <div className="d-flex pt-2 justify-content-end gap-2">
                                    <div className="w-50 d-flex flex-column gap-2">
                                        <input
                                            type="text"
                                            value={formData.MainImage}
                                            onChange={(e) => setFormData({ ...formData, MainImage: e.target.value })}
                                            placeholder="MAIN IMAGE LINK"
                                            style={{ backgroundColor: "rgb(245 245 245)" }}
                                            className=" px-3 search-input text-black border-0 w-100"
                                        />
                                        <input
                                            type="text"
                                            value={formData.imageOne}
                                            onChange={(e) => setFormData({ ...formData, imageOne: e.target.value })}
                                            placeholder="FIRST IMAGE ALBUM LINK"
                                            style={{ backgroundColor: "rgb(245 245 245)" }}
                                            className=" px-3 search-input text-black border-0 w-100"
                                        />
                                        <input
                                            type="text"
                                            value={formData.imageTwo}
                                            onChange={(e) => setFormData({ ...formData, imageTwo: e.target.value })}
                                            placeholder="SECOND IMAGE ALBUM LINK"
                                            style={{ backgroundColor: "rgb(245 245 245)" }}
                                            className=" px-3 search-input text-black border-0 w-100"
                                        />
                                    </div>
                                    <div className="w-50 d-flex gap-2">
                                        <div className="w-75 gap-2 d-flex justify-content-between align-items-center flex-wrap">
                                            {productSizes.map((el) => (
                                                <button
                                                    key={el}
                                                    onClick={() => {
                                                        handleSizeClicked(el);
                                                    }}
                                                    type="button"
                                                    style={{
                                                        backgroundColor: formData.sizes.includes(el) ? 'black' : "rgb(245 245 245)",
                                                        color: formData.sizes.includes(el) ? 'white' : 'black',
                                                        fontSize: "10px",
                                                    }}
                                                    className="border-0 w-25 py-2"
                                                >
                                                    {el}
                                                </button>
                                            ))}
                                        </div>
                                        <button
                                        onClick={handleSaveBtn}
                                        type="button" style={{ backgroundColor: "black" }} className="btn w-25 text-white">
                                            SAVE
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
    )
}