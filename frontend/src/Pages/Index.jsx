import React from 'react';
import { useSelector } from 'react-redux';

const HomePage = () => {
    const products = useSelector((state) => {return state.productData});
    console.log(products)
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">E-Commerce Home</h1>
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="border-4 border-dashed border-gray-200 rounded-lg h-auto p-5">
                            <h2 className="text-2xl font-semibold text-gray-700">Welcome to our store!</h2>
                            <p className="mt-4 text-gray-600">Browse our collection of amazing products.</p>
             
                                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {Array.from(products).map((product, index) => (
                                        <li key={product.id} className="flex flex-col rounded-lg p-3 border-black border-2 border-solid">
                                            <div className='overflow-hidden h-52 m-2'>
                                                <img className="w-fit h-full object-cover m-auto rounded-md" src={product.image} alt={product.title} />
                                            </div>
                                            <div className='flex flex-col'>
                                            <p className="title w-full m-2 font-extrabold rounded-md mb-2  overflow-hidden overflow-ellipsis">{product.title}</p>
                                            <p className="h-24 m-2 ml-0 mr-0 font-semibold w-full rounded-md mb-2 overflow-ellipsis overflow-hidden">Description : {product.description}</p>
                                            <p className="h-auto m-2 p-2 bg-orange-500  flex-row font-extrabold w-max text-black rounded-md mb-2" >RS. {product.price}</p>
                                            <p className="w-max h-auto m-2 p-2 bg-black text-white font-extrabold  flex-row rounded-md">#{product.category}</p>
                                            </div>

                                        </li>
                                    ))}
                                </ul>
                  
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HomePage;


