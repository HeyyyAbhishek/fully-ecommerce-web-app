
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../Redux/features/cartReducers"; // Adjust the import path as needed

const ProductPage = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  let product = useSelector((state)=>{
    return state.productData.products.find((product)=> product.id === parseInt(id));
  })
   // Assuming you're using React Router for routing
   console.log("Product",product);
   let isInCart = useSelector((state) => {
    return state.cart.cart.some((item) => item.id === product.id);
   })

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
      <main className="container mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-auto p-5 bg-white text-gray-800">
            <h2 className="text-3xl font-semibold text-center">
              {product.title}
            </h2>
            <div className="flex flex-col md:flex-row mt-6">
              <div className="md:w-1/2">
                <img
                  className="w-full h-auto object-cover rounded-md"
                  src={product.image}
                  alt={product.title}
                />
              </div>
              <div className="md:w-1/2 md:pl-6 mt-4 md:mt-0">
                <p className="text-lg mb-4">{product.description}</p>
                <p className="text-2xl font-bold mb-4">RS. {product.price}</p>
                <div className="flex space-x-4">
                  {isInCart ? (
                    <button
                      onClick={() => dispatch(removeFromCart(product.id))}
                      className="p-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded-md"
                    >
                      Remove from Cart
                    </button>
                  ) : (
                    <button
                      onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
                      className="p-2 bg-green-500 hover:bg-green-700 text-white font-bold rounded-md"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
