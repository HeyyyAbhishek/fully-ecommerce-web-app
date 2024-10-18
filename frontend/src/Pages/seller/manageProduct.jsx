import ListProduct from "./listProducts";
import AddProduct from "./addProduct";
import { Link } from "react-router-dom";
import { deleteProduct,addProduct } from "../../Redux/features/sellerReducer";

const ManageProduct = () => {

    return (
        <div className="p-4">
            <div className="mb-4">
                <div className="bg-white shadow-md rounded-lg p-4">
                   <Link to="/seller/addproduct" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add Product</Link>
                </div>
            </div>
            <div>
                <ListProduct props={deleteProduct} />
            </div>
        </div>
    );
};

export default ManageProduct;
