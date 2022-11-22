import { createReducer, on } from '@ngrx/store';
import { Cart } from 'src/app/types/cart';
import { setCart } from '../actions/cart.actions';

export const initialState: Cart = {
    id: 0,
    products: [],
    total: 0,
    discountedTotal: 0,
    userId: 0,
    totalProducts: 0,
    totalQuantity: 0,
};

export const cartReducer = createReducer(
    initialState,
    on(setCart, (_, { cart }) => ({ ...cart })),
);
