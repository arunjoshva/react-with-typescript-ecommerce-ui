import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../utils/api";
import type { Category } from "../types/category";
import beautyImg from "../assets/categories/beauty.webp" ;
import fragrancesImg from "../assets/categories/fragrances.webp";
import furnitureImg from "../assets/categories/furniture.webp";
import groceriesImg from "../assets/categories/groceries.webp";
import homeImg from "../assets/categories/home.webp";
import kitchenImg from "../assets/categories/kitchen.webp";
import laptopImg from "../assets/categories/laptop.webp";
import menShirtImg from "../assets/categories/men.webp";
import menShoeImg from "../assets/categories/menshoe.webp";
import menWatchImg from "../assets/categories/menwatch.webp";
import mobileImg from "../assets/categories/mobile.webp";
import motorImg from "../assets/categories/motor.webp";
import smartPhoneImg from "../assets/categories/phone.webp";
import skinImg from "../assets/categories/skin.webp";
import sportImg from "../assets/categories/sport.webp";
import sunGlassImg from "../assets/categories/sun.webp";
import tabletImg from "../assets/categories/tablet.webp";
import topImg from "../assets/categories/top.webp";
import vehicleImg from "../assets/categories/vehicle.webp";
import womenBagImg from "../assets/categories/womenbag.webp";
import womenDressImg from "../assets/categories/dress.webp";
import womenJewelImg from "../assets/categories/jewel.webp";
import womenShoeImg from "../assets/categories/womenshoe.webp";
import womenWatchImg from "../assets/categories/womenwatch.webp";
import heroBanner from "../assets/categories/heroBanner.png";

function Home(){

    const [categories, setCategories] = useState<Category[]>([]);
    const navigate = useNavigate();
    const categoryImages: Record<string, string> = {
        beauty: beautyImg,
        fragrances: fragrancesImg,
        furniture: furnitureImg,
        groceries: groceriesImg,
        "home-decoration": homeImg,
        "kitchen-accessories": kitchenImg,
        laptops: laptopImg,
        "mens-shirts": menShirtImg,
        "mens-shoes": menShoeImg,
        "mens-watches": menWatchImg,
        "mobile-accessories": mobileImg,
        motorcycle: motorImg,
        "skin-care": skinImg,
        smartphones: smartPhoneImg,
        "sports-accessories": sportImg,
        sunglasses: sunGlassImg,
        tablets: tabletImg,
        tops: topImg,
        vehicle: vehicleImg,
        "womens-bags": womenBagImg,
        "womens-dresses": womenDressImg,
        "womens-jewellery": womenJewelImg,
        "womens-shoes": womenShoeImg,
        "womens-watches": womenWatchImg
    };

    useEffect(() => {
        async function fetchCategories () {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error(`Error Fetching Categories: ${error}`);
            }
        }

        fetchCategories();
    }, []);

    return(
        <div className="px-4 md:px-8 lg:px-16 py-8">

            {/* Hero Section */}
                <img src={heroBanner} alt="Shop" onClick={() => navigate("/shop")} className="w-full h-[250px] sm:h-[380px] md:h-[500px] lg:h-[600px] object-cover object-top sm:object-center rounded-3xl cursor-pointer py-2" />

            {/* Categories Section */}
            <h2 className="text-2xl font-bold mt-2 mb-6 text-gray-800">Shop By Categories</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {
                    categories.map((category) => {
                        return(
                            <div key={category.slug} 
                                onClick={() => navigate(`/shop/?category=${category.slug}`)} 
                                className="bg-white rounded-2xl p-6 text-center shadow hover:shadow-xl cursor-pointer transition group"
                            >
                                <img src={categoryImages[category.slug]} alt={category.name} className="w-full h-32 object-cover rounded-lg mb-3 group-hover:scale-105 transition" />

                                <h3 className="font-semibold text-gray-700 capitalize group-hover:text-indigo-600">{category.name}</h3>
                            </div>
                        );
                    })
                }
            </div>


        </div>
    );
}

export default Home;