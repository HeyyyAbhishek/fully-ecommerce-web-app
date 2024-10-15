import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../../Redux/features/sellerReducer';

const UpdateProduct = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [category, setCategory] = useState('');
    const [Img, setImg] = useState('');
    const [Id, setId] = useState('');
    const dispatch = useDispatch();

    const product = useSelector((state) => state.seller.product);
    const handleUpdateProduct = () => {
        dispatch(updateProduct(product));
    };

    return 
};

export default UpdateProduct;