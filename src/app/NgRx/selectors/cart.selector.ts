import { createSelector } from "@ngrx/store";
import { Cart } from "src/app/types/cart";
import { AppState } from ".";

export const selectFeature = (state: AppState) => state.cart;

export const cartSelector = createSelector(
    selectFeature,
    (state: Cart) => state
);
