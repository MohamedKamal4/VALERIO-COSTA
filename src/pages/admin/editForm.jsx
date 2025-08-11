import { Alert } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { MdCheckCircleOutline } from "react-icons/md";

export default function EditProducts({selectedProduct,editData,setClickedId,setEditData,setData,setMsgContent}){
     function handleDeleteBtn(id){
                fetch(`http://localhost:5000/products/${id}` , {
                    method: 'DELETE'
                })
                .then((res) => res.json())
                .then((data) => {
                    setMsgContent(
                        <Alert
                            icon={<MdCheckCircleOutline fontSize="inherit" />}
                            severity="success"
                        >
                            YOUR DELETE SUCCESSFULLY, PLEASE WAIT...
                        </Alert>
                    )
                    setData(prev => prev.filter(product => product.id !== id));
                    setTimeout(() => {
                        setClickedId(null)
                    },2000)
                    console.log(data)
                }).catch((err) => {
                    setMsgContent(
                        <Alert
                            icon={<MdCheckCircleOutline fontSize="inherit" />}
                            severity="error"
                        >
                            YOUR DELETE FAILED, TRAY AGIEN...
                        </Alert>
                    )
                    console.log(err)
                });
        }
    
    
    
    
        const updateProduct = async (productId) => {
            try {
                const response = await fetch(`http://localhost:5000/products/${productId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editData),
                });
    
                if (!response.ok) {
                setMsgContent(
                    <Alert
                        icon={<MdCheckCircleOutline fontSize="inherit" />}
                        severity="error"
                    >
                        YOUR UPDATE NOT SUCCESSFULLY, TRY AGIEN...
                    </Alert>
                )
                throw new Error('Failed to update product');
                }
    
                const result = await response.json();
                console.log('Product updated successfully:', result);
                 setMsgContent(
                    <Alert
                        icon={<MdCheckCircleOutline fontSize="inherit" />}
                        severity="success"
                    >
                        YOUR UPDATE SUCCESSFULLY, PLEASE WAIT...
                    </Alert>
                )
                setData(prev =>
                    prev.map((product) =>
                        product.id === productId ? { ...product, ...editData } : product
                    )
                );
                setTimeout(() => {
                    setClickedId(null)
                },2000)
    
                } catch (error) {
                    console.error('Error updating product:', error);
                }
            };
    
    return(
        selectedProduct && (
            <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50" style={{ zIndex: 1050 }}>
                <div className="p-4 rounded-3 d-flex justify-content-center align-items-center" style={{ width: "800px", maxHeight: "90vh", overflowY: "auto", backgroundColor: "#ffffff8a", backdropFilter: "blur(5px)", WebkitBackdropFilter: "blur(5px)" }}>
                    <div className="w-50 h-100">
                        <img className="w-100 h-100" src={selectedProduct.MainImage} alt="" />
                    </div>
                    <form className="p-4 w-100 d-flex flex-column gap-3">
                        <div className="w-100 d-flex justify-content-end">
                            <button type="button" className="btn" onClick={() => setClickedId(null)}>
                                <AiOutlineClose size={20} color="black" />
                            </button>
                        </div>
                        <input type="text" value={editData.name} onChange={(e) => setEditData({...editData , name: e.target.value})} placeholder="NAME" style={{ backgroundColor: "rgb(245 245 245)" }} className=" px-3 search-input text-black border-0 w-100" />
                        <textarea 
                        value={editData.discription}
                        onChange={(e) => setEditData({ ...editData, discription: e.target.value })}
                        className="search-input text-black border-0 w-100 px-3 pt-2" placeholder="DESCRIPTION" style={{height: '100px',  backgroundColor: "rgb(245 245 245)" }} />
                        <div className="d-flex gap-3">
                            <input type="number" value={editData.originalPrice} onChange={(e) => setEditData({...editData , originalPrice: e.target.value})} style={{ backgroundColor: "rgb(245 245 245)" }} className=" px-3 search-input text-black border-0 w-100" placeholder="ORIGINAL PRICE" />
                            <input type="number" value={editData.price} onChange={(e) => setEditData({...editData , price: e.target.value})} style={{ backgroundColor: "rgb(245 245 245)" }} className=" px-3 search-input text-black border-0 w-100" placeholder="PRICE" />
                        </div>
                        <div className="d-flex justify-content-end gap-2">
                            <button type="button" onClick={() => handleDeleteBtn(selectedProduct.id)} style={{ backgroundColor: "red" }} className="btn text-white px-4">
                                DELETE
                            </button>
                            <button type="button" onClick={() => updateProduct(selectedProduct.id)} style={{ backgroundColor: "black" }} className="btn text-white px-4">
                                SAVE
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    )
}