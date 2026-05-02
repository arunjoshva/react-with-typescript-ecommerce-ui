import axios from "axios";
import type { Product, ProductsResponse } from "../types/product";
import type { Category } from "../types/category";

const API = axios.create(
    {
        baseURL: "https://dummyjson.com/"
    }
);

export const getProducts = async (): Promise<Product[]> => {
    const response = await API.get<ProductsResponse>("/products");
    return response.data.products;
};

export const getProductById = async (id:string): Promise<Product> => {
    const response = await API.get<Product>(`/product/${id}`);
    return response.data;
}

export const getCategories = async (): Promise<Category[]> => {
    const response = await API.get<Category[]>(`/product/categories`);
    return response.data;
}

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
    const response = await API.get<ProductsResponse>(`/products/category/${category}`);
    return response.data.products;
}