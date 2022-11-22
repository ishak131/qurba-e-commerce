import { createReducer, on } from '@ngrx/store';
import { ProductResponse } from 'src/app/types/product';
import { setProducts, setProductsFromGetByCategory, setProductsFromSearch } from '../actions/products.actions';

export const initialState: ProductResponse = {
    products: [],
    limit: 0,
    skip: 0,
    total: 0
};

export const productResponseReducer = createReducer(
    initialState,
    on(setProducts, (state, { products }) => ({ ...state, products })),
    on(setProductsFromGetByCategory, (state, { products }) => ({ ...state, products: [...state.products, ...products] })),
    on(setProductsFromSearch, (state, { products, total }) => ({ ...state, total, products })),
);
