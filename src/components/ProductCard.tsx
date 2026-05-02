import { useNavigate } from "react-router-dom";
import type { Product } from "../types/product";

type Props = {
    product: Product;
};

function ProductCard({ product }: Props){

    const navigate = useNavigate();

    return(
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>

            <div className="overflow-hidden">
                
                <img src={product.thumbnail} alt={product.title}  className="w-full h-48 object-cover group-hover:scale-105 transition duration-300" />
            
            </div>

            <div className="p-4 flex flex-col gap-2">

                <h2 className="font-semibold text-lg text-gray-800 line-clamp-1">{product.title}</h2>

                <div className="flex items-center justify-between mt-2">

                    <span className="text-lg font-bold text-indigo-600">${product.price}</span>

                    <span className="text-sm text-yellow-500 font-medium">⭐{product.rating}</span>

                </div>

                <button onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${product.id}`);
                }} className="mt-3 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer">Shop Now</button>
            
            </div>
        </div>
    );
}

export default ProductCard;