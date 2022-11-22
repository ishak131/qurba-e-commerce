import { createReducer, on } from '@ngrx/store';
import { ProductResponse } from 'src/app/types/product';
import { resetProducts, setProductResponse, setProducts, setProductsFromGetByCategory, setProductsFromSearch } from '../actions/products.actions';

export const initialState: ProductResponse = {
    products: [],
    limit: 0,
    skip: 0,
    total: 0
};

export const productResponseReducer = createReducer(
    initialState,
    on(setProducts, (state, { products }) => ({ ...state, products })),
    on(setProductsFromGetByCategory, (state, { productResponse: { products, limit, skip, total } }) => ({
        limit: limit + state.limit,
        skip: skip + state.skip,
        total: total + state.total,
        products: [...state.products, ...products]
    })),
    on(setProductsFromSearch, (state, { products, total }) => ({ ...state, total, products })),
    on(setProductResponse, (_, { productResponse }) => ({ ...productResponse })),
    on(resetProducts, () => ({ ...initialState }))
);
