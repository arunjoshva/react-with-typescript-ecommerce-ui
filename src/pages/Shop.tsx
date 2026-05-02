import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import ProductCard from "../components/ProductCard";
import { getProducts, getProductsByCategory } from "../utils/api";
import { useSearchParams } from "react-router-dom";

function Shop(){

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");

    useEffect(() => {

        const fetchData = async () => {
            try {

                let data;

                if(category){
                    data = await getProductsByCategory(category);
                }else{
                    data = await getProducts();
                }
                
                setProducts(data);
            } catch (error) {
                console.error(`Error fetching Products: ${error}`);
            }finally{
                setLoading(false);
            }
        };

        fetchData();        
    }, [category]);

    if(loading) return <p className="text-center">Loading...</p>

    return(

        <div className="max-w-7xl mx-auto px-4 py-6">

            <h1 className="text-2xl font-bold mb-6 text-gray-800">Shop Products</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => {
                    return <ProductCard key={product.id} product={product}/>
                })}
            </div>

        </div>
    );
}

export default Shop;