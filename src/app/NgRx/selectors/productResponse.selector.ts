import { createSelector } from "@ngrx/store";
import { ProductResponse } from "src/app/types/product";
import { AppState } from ".";




export const selectFeature = (state: AppState) => state.productResponse;

export const productResponseSelector = createSelector(
    selectFeature,
    (state: ProductResponse) => state
);


export const productsSelector = createSelector(
    selectFeature,
    (state: ProductResponse) => state.products
);

export const totalProductsSelector = createSelector(
    selectFeature,
    (state: ProductResponse) => state.total
);
