import { createReducer, on } from '@ngrx/store';
import { ProductResponse } from 'src/app/types/product';
import { resetProducts, setProductResponse, setProductsFromGetByCategory } from '../actions/products.actions';

export const initialState: ProductResponse = {
    products: [],
    limit: 0,
    skip: 0,
    total: 0
};

export const productResponseReducer = createReducer(
    initialState,
    on(setProductsFromGetByCategory, (state, { productResponse: { products, limit, skip, total } }) => {
        return ({
            limit: limit + state.limit,
            skip: skip + state.skip,
            total: total + state.total,
            products: [...state.products, ...products]
        })
    }),
    on(setProductResponse, (_, { productResponse }) => ({ ...productResponse })),
    on(resetProducts, () => ({ ...initialState }))
);
