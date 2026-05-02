import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function OrderSuccess(){
    const navigate = useNavigate();

    return(
        <div className="flex flex-col items-center justify-center min-5-[70vh] text-center py-4">

            {/* Icon */}
            <div className="bg-green-100 p-6 rounded-full mb-6">
                <CheckCircle className="w-16 h-16 text-green-600 animate-scale-in"/>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>

            {/* Message */}
            <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been confirmed 🎉</p>

            {/* Buttons */}
            <div className="flex gap-4">

                <button onClick={() => navigate("/")} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 cursor-pointer">Go to Home</button>

                <button onClick={() => navigate("/shop")} className="border border-indigo-600 text-indigo-600 px-6 py-2 rounded-lg hover:bg-indigo-50 transition cursor-pointer">Continue Shopping</button>

            </div>

        </div>
    );
}

export default OrderSuccess;