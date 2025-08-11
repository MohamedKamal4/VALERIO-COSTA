import { useEffect, useState } from "react";
import { Card, CardActionArea, CardMedia } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import EditProducts from "./editForm";
import AddForm from "./addForm";

export default function Products() {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("all");
    const [clickedId, setClickedId] = useState(null);
    const [openForm, setOpenForm] = useState(false);
    const totalSold = data.reduce((acc, cur) => acc + (cur.soldCount || 0), 0);
    const selectedProduct = data.find((p) => p.id === clickedId);
    const[msgContent , setMsgContent ] = useState('')
    const Btns = ["ALL", "PANTS", "JACKETS", "SHOES", "SHIRTS", "HOODIES", "T - SHIRTS"];
    const [formData, setFormData] = useState({
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

    const filteredProducts = data.filter((product) => {
        if (filter === "all") return true;
        return product.category === filter || product.type?.toLowerCase() === filter;
    });

    const [editData, setEditData] = useState({
        name: "",
        discription: '',
        originalPrice: 0,
        price: 0,
    });

    const isValid = 
    formData.name !== '' &&
    formData.MainImage !== '' &&
    formData.discription !== '' &&
    formData.sizes.length !== 0 &&
    formData.originalPrice !== 0 &&
    formData.price !== 0 &&
    formData.quantity !== 0 &&
    formData.MainImage !== '' &&
    formData.imageOne !== '' &&
    formData.imageTwo !== ''


    useEffect(() => {
        if (selectedProduct) {
            setEditData({
                name: selectedProduct.name,
                discription: selectedProduct.discription,
                originalPrice: selectedProduct.originalPrice,
                price: selectedProduct.price,
            });
        }
    }, [selectedProduct]);

    useEffect(() => {
        fetch("http://localhost:5000/products")
            .then((res) => res.json())
            .then(setData)
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        setTimeout(()=> {
            setMsgContent('')
        },3000)
    },[msgContent])

    return (
        <div className="w-100 position-relative">


            <div className="row d-flex justify-content-between align-items-center flex-wrap bg-white sticky-top" style={{ top: 0, zIndex: 1000 }}>
                <h2 className="col-4 text-black">Products</h2>
                <ul className="col-8 d-flex justify-content-between align-items-center m-0 py-3 rounded-pill" style={{ backgroundColor: "rgb(245 245 245)" }}>
                    {Btns.map((btn) => (
                        <li key={btn} className="px-3">
                            <button
                                style={{ fontSize: filter === btn.toLowerCase() ? "15px" : "12px", fontWeight: filter === btn.toLowerCase() ? "bold" : "normal" }}
                                className="border-0 bg-transparent text-black"
                                onClick={() => {
                                    setFilter(btn.toLowerCase());
                                    setClickedId(null);
                                }}
                            >
                                {btn}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="col-12 d-flex justify-content-between align-items-center py-3">
                    <span className="name-product">TOTAL PRODUCTS: {filteredProducts.length}</span>
                    <span className="name-product">TOTAL SOLD: {totalSold} $</span>
                    <span className="name-product">LAST UPDATED: 2025-01-13</span>
                </div>
            </div>



            <div className="row g-5 pt-5 justify-content-center align-items-center w-100">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product.id} 
                        onClick={() => setClickedId(product.id)}
                        style={{height: '400px'}} className="col-11 col-sm-6 col-lg-4 d-flex justify-content-center align-items-center">
                            <Card style={{ boxShadow: "none", width: "100%" }}>
                                <CardActionArea>
                                    <CardMedia
                                        role="button"
                                        component="img"
                                        height="350"
                                        image={product.MainImage}
                                        alt={product.name}
                                        className="img-card"
                                    />
                                    <div style={{height: '50px'}} className="d-flex justify-content-center align-items-center">
                                        <p className="name-product p-0 m-0">{product.name}</p>
                                    </div>
                                </CardActionArea>
                            </Card>
                        </div>
                    ))
                ) : (
                    <div className="d-flex flex-column justify-content-center align-items-center w-100" style={{ height: "500px" }}>
                        <h6>NO PRODUCTS</h6>
                    </div>
                )}
            </div>



            <EditProducts selectedProduct={selectedProduct} setClickedId={setClickedId} editData={editData} setEditData={setEditData} setData={setData} setMsgContent={setMsgContent} />



            <div style={{ position: "fixed", bottom: "30px", right: "50px" }}>
                <button type="button" onClick={() => setOpenForm(true)} className="bg-transparent border-0">
                    <FaPlus size={25} color="black" />
                </button>
            </div>


            <AddForm isValid={isValid} openForm={openForm} formData={formData} setMsgContent={setMsgContent} setData={setData} Btns={Btns} setOpenForm={setOpenForm} setFormData={setFormData}/>
            
            
            <div className="d-flex justify-content-center align-items-center position-fixed" style={{left: "20px",bottom: "20px",zIndex: '99999999'}}>
                {msgContent}
            </div>

            
        </div>
    );
}
