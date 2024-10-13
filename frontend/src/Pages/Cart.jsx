// /d:/Projects/Stackup/E-Commerce Web App/ecommerce-web-app/frontend/src/Pages/Cart.jsx

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity} from '../Redux/features/cartReducers.js';

const Cart = () => {
    const navigate = useNavigate();
    const cartItems = useSelector((state) => [...state.cart.cart]);
    const dispatch = useDispatch();
    
    
    const handleRemove = (id) => {
        console.log(id);
        dispatch(removeFromCart(id));
    };
    
    const handleQuantityChange = (id, quantity) => {
        console.log("Quantity", quantity);
        let data = {id, quantity: parseInt(quantity)};
        dispatch(updateQuantity(data));
    };
    let totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);  
    const HandleChekout = () => {
        try {
            navigate("/checkout");
        } catch (error) {
            console.log(error);}
    };
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
            ) : (
                <div className="bg-white shadow-md rounded-lg p-4">
                    <table className="min-w-full bg-white border-b-4 border-black ">
                        <thead>
                            <tr>
                                <th className="py-2">Product Name</th>
                                <th className="py-2">Image</th>
                                <th className="py-2">Price</th>
                                <th className="py-2">Quantity</th>
                                <th className="py-2">Total</th>
                                <th className="py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                
                                <tr  key={item.id} className="border-t">
                                    <td className="py-2">{item.title}
                                    </td>
                                    <td className='py-2'> 
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-10 h-10 object-cover rounded"
                                        />
                                    </td>
                                    <td className="py-2">${item.price.toFixed(2)}</td>
                                    <td className="py-2">
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            min={1}
                                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                            className="w-16 p-1 border rounded"
                                        />
                                    </td>
                                    <td className="py-2">${(item.price * item.quantity).toFixed(2)}</td>
                                    <td className="py-2">
                                        <button
                                            onClick={() => handleRemove(item.id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 text-right">
                        <h2 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
                        <button onClick={()=>{
                            HandleChekout();
                        }}  className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Proceed to Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;