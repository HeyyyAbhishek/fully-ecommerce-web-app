import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../Redux/features/cartReducers";
import { useNavigate } from "react-router-dom";
import { payment } from "../Redux/features/userReducer";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart || []);
  // Calculate the total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const paymentDone = async () => {
    try {
      
      let items = cart.map((item) => ({
        title:item.title,
        id: item.id,
        quantity: item.quantity,
      }));

      const data = await dispatch(payment({ items, total }));
      console.log("data ",data)
      if(data.payload.auth){
        alert("Payment Done");
        console.log("payment data",data)
        dispatch(clearCart());
        navigate("/");
      }else{
        alert(data.payload.statusDetail || data.message)
      }

    } catch {
      alert("try again after some time");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Payment Page</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Order Summary
        </h2>
        <ul className="mb-6">
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center py-2 border-b border-gray-200"
            >
              <span className="text-gray-700">{item.title}</span>
              <span className="text-gray-700">
                ${item.price} x {item.quantity}
              </span>
            </li>
          ))}
        </ul>
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          Total: ${total.toFixed(2)}
        </h3>
        <button
          onClick={() => {
            paymentDone();
          }}
          className="w-max  bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Click To Pay
        </button>
      </div>
    </div>
  );
};

export default Payment;
