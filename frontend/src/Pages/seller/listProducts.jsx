import { useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";


const ListProduct = () => {


 // Add dependencies if needed
  const productId = useSelector((state) => {
    return state.seller.seller?.seller?.listedProducts;
  });
  const products = useSelector((state) => state.productData.products);
  const sellerProducts = useMemo(() => {
    return products.filter((product) => productId.includes(product._id));
  }, [products, productId]);

  console.log("Seller Products:", sellerProducts);
  // Optional: further memoize sellerProducts if complex calculations are involved

  return (
    <>
      <ul className="w-full grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4">
        {sellerProducts.map((product) => (
          <li
            key={product._id}
            className="relative rounded-lg shadow-md border border-gray-200 overflow-hidden bg-white transition-transform transform hover:scale-105"
          >
            <div className="h-48 w-full overflow-hidden relative">
              <img
                className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-90"
                src={product.image}
                alt={product.title}
              />
            </div>
            <div className="p-4 flex flex-col space-y-2">
              <h2 className="font-bold text-lg truncate">{product.title}</h2>
              <p className="text-sm text-gray-700">{product.description}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-lg font-medium text-orange-500">
                  Rs. {product.price}
                </p>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold transition"
                >
                  {product.category}
                </button>
              </div>
              <div className="flex justify-between items-center mt-4">
                <Link
                  to={`/products/${product.id}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg font-bold transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListProduct;
