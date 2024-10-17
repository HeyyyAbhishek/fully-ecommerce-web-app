import { useSelector } from "react-redux";
import { useMemo } from "react";
import AddProduct from "./addProduct";

const ManageProduct = () => {
    const { listedProductId, sellerProducts } = useSelector((state) => {
        const listedProductId = state.seller.seller?.seller?.listedProducts || [];
        const products = state.productData.products || [];
        console.log("Listed Product IDs:", listedProductId);
        // Filter only once within useSelector
        const sellerProducts = products.filter((product) =>
            console.log(listedProductId.includes(product._id))
        );

        return { listedProductId, sellerProducts };
    });

    // Optional: further memoize sellerProducts if complex calculations are involved
    const memoizedSellerProducts = useMemo(() => sellerProducts, [sellerProducts]);

    console.log("Listed Product IDs:", listedProductId);
    console.log("Seller Products:", memoizedSellerProducts);

    return (
        <>
            <div>Hello</div>
            <AddProduct />
            {memoizedSellerProducts.map((product) => (
                <div key={product._id}>{product.name}</div>
            ))}
        </>
    );
};

export default ManageProduct;
