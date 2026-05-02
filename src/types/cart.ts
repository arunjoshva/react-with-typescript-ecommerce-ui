import type { Product } from "./product";

type Quantity = {
    quantity: number;
};

export type CartItem = Product & Quantity;
