import React from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
  const products = useSelector((state) => {
    return state.productData;
  });
  
  return (
    <div className="min-h-screen bg-gray-100">
      <main>
        <div className=" mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-auto p-5">
              <h2 className="text-2xl font-semibold w-max mx-auto text-gray-700">
                Welcome to our store!
              </h2>
              <p className="mt-4 text-gray-600 w-max mx-auto my-12" >
                Browse our collection of amazing products.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from(products).map((product, index) => (
                  <li
                    key={product.id}
                    style={{height:"30rem"}} className="flex flex-col relative rounded-lg p-3 border-black border-2 border-solid"
                  >
                    <div className="absolute z-10 top-0 right-0">
                      <button className="w-max h-auto m-2 p-2 bg-black text-white font-extrabold  text-xs flex-row rounded-md">
                        #{product.category}
                      </button>
                    </div>
                    <div className="overflow-hidden h-3/6 relative mt-2 flex m-2">
                      <div className="h-full w-full">
                        <img
                          className="w-fit h-full object-cover m-auto rounded-md"
                          src={product.image}
                          alt={product.title}
                        />
                      </div>
                    </div>
                    <div  style={{gridTemplateRows:"30% 50% 20%"}} className="grid h-3/6">
                      <p className="title font-extrabold rounded-md mb-2  overflow-auto overflow-ellipsis">
                        {product.title}
                      </p>
                      <p className="ml-0 mr-0 font-semibold w-full rounded-md mb-2 overflow-ellipsis overflow-auto">
                        Description : {product.description}
                      </p>
                      <div className="flex justify-around items-center">
                        <p className="h-auto inline-block p-2 bg-orange-500 font-medium w-max text-black rounded-md mb-2">
                          RS. {product.price}
                        </p>
                        <button className="p-2 bg-rose-400 font-medium  w-max text-black rounded-md mb-2 inline-block">
                          Add to Cart
                        </button>
                      </div>
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
