import { addProduct } from "../../Redux/features/sellerReducer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [product, setProduct] = useState({
        id: 1,
        title: "",
        price: 0,
        description: "",
        category: "",
        image: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    product.seller = useSelector((state) => state.seller.seller?.seller?._id);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await dispatch(addProduct(product));
            console.log("Product added", data);
            navigate("/seller");
        } catch (err) {
            console.error("Failed to add product", err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Add Product</h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="id" className="sr-only">
                                ID
                            </label>
                            <input
                                id="id"
                                name="id"
                                type="number"
                                autoComplete="id"
                                required
                                className="relative block w-full px-3 py-2 border border-gray-300 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="ID"
                                value={product.id}
                                onChange={(e) => setProduct({ ...product, id: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="title" className="sr-only">
                                Title
                            </label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                autoComplete="title"
                                required
                                className="relative block w-full px-3 py-2 border border-gray-300 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Title"
                                value={product.title}
                                onChange={(e) => setProduct({ ...product, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="sr-only">
                                Description
                            </label>
                            <input
                                id="description"
                                name="description"
                                type="text"
                                autoComplete="description"
                                required
                                className="relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Description"
                                value={product.description}
                                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="price" className="sr-only">
                                Price
                            </label>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                autoComplete="price"
                                required
                                className="relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Price"
                                value={product.price}
                                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="category" className="sr-only">
                                Category
                            </label>
                            <input
                                id="category"
                                name="category"
                                type="text"
                                autoComplete="category"
                                required
                                className="relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Category"
                                value={product.category}
                                onChange={(e) => setProduct({ ...product, category: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="image" className="sr-only">
                                Image
                            </label>
                            <input
                                id="image"
                                name="image"
                                type="text"
                                autoComplete="image"
                                required
                                className="relative block w-full px-3 py-2 border border-gray-300 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Image"
                                value={product.image}
                                onChange={(e) => setProduct({ ...product, image: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;