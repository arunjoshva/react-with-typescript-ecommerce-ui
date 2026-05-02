import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart(){
    const { cart, increaseQty, decreaseQty } = useCart();
    const navigate = useNavigate();

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if(cart.length === 0){
        return (<div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-600">Your cart is empty 🛒</h2>
        </div>);
    }

    return(
        <div className="max-w-4xl mx-auto px-4 py-10">
           
           {/* Title */}
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h1>

            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 text-gray-600 font-semibold border-b pb-3 mb-4">
                <span className="col-span-2">Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Total</span>
            </div>

            {/* Cart Items */}
            <div className="space-y-6">
                {cart.map((item) => (
                    <div key={item.id} className="grid grid-cols-5 gap-4 items-center bg-white p-4 rounded-xl shadow-sm">

                        {/* Product */}
                        <div className="col-span-2 flex items-center gap-2">
                            <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
                            <p className="font-medium text-gray-800 text-sm md:text-base">{item.title}</p>
                        </div>

                        {/* Price */}
                        <p className="text-gray-600">${item.price}</p>

                        {/* Quantity */}
                        <div className="flex items-center gap-2">
                            <button onClick={() => decreaseQty(item.id)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => increaseQty(item.id)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">+</button>
                        </div>

                        {/* Total */}
                        <p className="font-semibold text-gray-800 px-3">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                ))}
            </div>

            {/* Bottom Section */}
            <div className="mt-10 flex justify-between items-center gap-6">

                {/* Total */}
                <h2 className="text-xl font-bold text-gray-800 md:text-2xl">Total: ${totalAmount.toFixed(2)}</h2>

                {/* Checkout Button */}
                <button onClick={() => navigate("/checkout")} className="bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 transition cursor-pointer">Checkout</button>

            </div>

        </div>
    );
}

export default Cart;