import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import type { CheckoutForm } from "../types/form";
import { useNavigate } from "react-router-dom";

function Checkout(){
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    const [form, setForm] = useState<CheckoutForm>({
        name: "",
        address: "",
        phone: ""
    });

    const [flash, setFlash] = useState<string | null>(null);

    const total = cart.reduce((sum, item) => (
        sum + item.price * item.quantity
    ), 0);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
            e.preventDefault();

            if(!form.name || !form.address || !form.phone){
                setFlash("Please fill all fields");                
                return;
            }

            setFlash("Order placed successfully!");  
            
            setTimeout(() => {
                clearCart();
                navigate("/success");
            }, 2000);
    }

    useEffect(() => {
        if(flash){
            const timer = setTimeout(() => {
                setFlash(null);
            }, 3000);

            return () => clearTimeout(timer); //cleanup
        }
    }, [flash]);

    if(cart.length === 0){
        return <p className="text-center mt-10">Your Cart is empty 🛒</p>
    }

    return(
        <>
            {flash && <div className="fixed top-20 right-10 bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">{flash}</div>}

            <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-10">

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow flex flex-col gap-4">

                    <h2 className="text-xl font-bold mb-2">Shipping Details</h2>

                    <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="border border-slate-200 p-3 rounded-lg focus:border-indigo-500 focus:outline-none"/>

                    <textarea name="address" placeholder="Address" value={form.address} onChange={handleChange} className="border border-gray-200 p-3 rounded-lg focus:border-indigo-500 focus:outline-none" />

                    <input type="number" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} className="border border-gray-200 p-3 rounded-lg focus:border-indigo-500 focus:outline-none" />

                    <button className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition cursor-pointer">Place Order</button>

                </form>

                {/* Order Summary */}
                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                    {cart.map((item) => (
                        <div key={item.id} className="flex justify-between mb-2 text-sm">

                            <span>{item.title} x {item.quantity}</span>

                            <span>{item.price * item.quantity}</span>

                        </div>
                    ))}

                    <hr className="my-4" />

                    <div className="flex justify-between font-bold text-lg">

                        <span>Total</span>

                        <span>${total}</span>

                    </div>

                </div>


            </div>
        </>
    );



}

export default Checkout;