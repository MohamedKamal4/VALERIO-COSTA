import { AiOutlineMinus } from "react-icons/ai"; 
import { AiOutlinePlus } from "react-icons/ai"; 
export default function Quantity({count, setCount, product, inStock}) {
    return (
         <div className="d-flex w-50 justify-content-end count-box">
            <div className="d-flex w-50 justify-content-between align-items-center">
            <button className="btn w-25"
            disabled={count === 0} onClick={() => setCount(count - 1)}>
                <AiOutlineMinus size={5} />
              </button>
              <input
                className="count w-50 text-center border-0 bg-transparent"
                style={{ fontSize: "12px" }}
                readOnly
                value={count}
              />
              <button
                className="btn w-25"
                disabled={count === product.quantity || inStock === 0}
                onClick={() => setCount(count + 1)}
              >
                <AiOutlinePlus size={5} />
              </button>
            </div>
          </div>
    )
}