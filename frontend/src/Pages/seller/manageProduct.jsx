import { useDispatch, useSelector } from 'react-redux';
import {NavLink} from "react-router-dom";
import { Routes,Route, Outlet } from 'react-router';
import AddProduct from './addProduct';
import { loadSellerProfile } from '../../Redux/features/sellerReducer';

const ManageProduct = () => {
    // const history = useHistory();
    const user = useSelector((state) => state.user);
    const listedProductsId = useSelector((state) => state.seller.seller.seller.listedProducts.map((product) => product));
    console.log("listedProductsId", listedProductsId);
    const products = useSelector((state) => state.productData.products.filter((product) => listedProductsId.includes(product._id)));
    console.log("products", products);
    return (
        <AddProduct />     
    );
};

export default ManageProduct;