import {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addToCart,removeFromCart } from "../Redux/features/cartReducers";
import { Link } from 'react-router-dom';
import { fetchProductData } from '../Redux/data/FakeData';
import { verifyLogin } from '../Redux/features/loginReducers';
import { getDetails } from '../Redux/features/userReducer';
import { loadSellerProfile } from '../Redux/features/sellerReducer';

const HomePage = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productData.products);

    const categories = [...new Set(products.map((product) => product.category))];
    // useEffect(()=>{
    //     console.log("App.js useEffect");
    
    //     const fetchData = async () => {
    //      await dispatch(fetchProductData())
    //      const res = await dispatch(verifyLogin()).unwrap()
    //      const deta = await dispatch(getDetails()).unwrap()
    //      if(res.user.isSeller){
    //        dispatch(loadSellerProfile())
    //      }
    //      console.log("Response:",deta)
    
    //     }
    //     fetchData()
    //   },[])

    const handleAddToCart = (product, target) => {
        let quantity = parseInt(target.value);
        quantity = quantity + 1;
        target.value = quantity;
        const updatedProduct = { ...product, quantity };
        dispatch(addToCart(updatedProduct));
        target.innerText = "Added";
        localStorage.setItem("cart", JSON.stringify(updatedProduct));

    };

    return (
        <div className=" min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl shadow-xl space-y-2 transform hover:scale-95 transition-transform duration-500">
            <main>
                <div className="mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="border-4 border-dashed border-gray-200 rounded-lg h-auto p-5">
                            <h2 className="text-2xl font-semibold w-max mx-auto text-gray-700">
                                Welcome to our store! hek_
                            </h2>
                            <p className="mt-4 text-gray-600 w-max mx-auto my-12">
                                Browse our collection of amazing products.
                            </p>

                            {categories.map((category) => (
                                <div key={category} className="mb-8">
                                    <h3 className="text-3xl font-bold text-gray-800  border-b-2 border-gray-300  mx-auto my-12 uppercase w-max">
                                        {category}
                                    </h3>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {products
                                            .filter((product) => product.category === category)
                                            .map((product) => (
                                                <li
                                                    key={product.id}
                                                    style={{ height: "30rem" }}
                                                    className="flex flex-col relative rounded-lg p-3 border-black border-2 border-solid"
                                                >
                                                    <div className="absolute z-10 top-0 right-0">
                                                        <button className="w-max h-auto m-2 p-2 bg-black text-white font-extrabold text-xs flex-row rounded-md">
                                                            #{product.category}
                                                        </button>
                                                    </div>
                                                    <div  style={{height:"40%"}} className="overflow-hidden relative mt-2 flex m-2">
                                                        <div className="h-full w-full">
                                                            <img
                                                                className="w-fit h-full object-cover m-auto rounded-md"
                                                                src={product.image}
                                                                alt={product.title}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div
                                                        style={{ gridTemplateRows: "20% 40% 40%" }}
                                                        className="grid"
                                                    >
                                                        <p className="title font-extrabold rounded-md mb-2 overflow-hidden w-full">
                                                            {product.title}
                                                        </p>
                                                        <p className="des ml-0 mr-0 font-semibold rounded-md mb-2">
                                                            Description : {product.description}
                                                        </p>
                                                        <div>
                                                            <p className="h-max m-1 inline-block p-2  bg-orange-500 font-medium w-max text-black rounded-md mb-2">
                                                                RS. {product.price}
                                                            </p>
                                                            <button value="0" onClick={()=>{handleAddToCart(product,event.target)}}  className="p-2 m-4 w-max mb-2 inline-block bg-green-500 hover:bg-green-700 text-white font-bold rounded-md">
                                                                Add to Cart
                                                            </button>
                                                            <button className='m-1'>
                                                                <Link to={`/products/${product.id}`} className="p-2 bg-rose-400 font-medium w-max text-black rounded-md mb-2 inline-block">View Details</Link>
                                                            </button>
                                                            {/* <p className='p-2  m-1 w-max mb-2 inline-block bg-emerald-950 hover:bg-emerald-900 text-white font-bold rounded-md'>
                                                                {product.quantity}
                                                            </p> */}
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HomePage;
