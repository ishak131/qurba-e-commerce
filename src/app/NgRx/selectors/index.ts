import { createSelector } from '@ngrx/store';
import { ProductResponse } from 'src/app/types/product';

export interface AuthenticationState {
    isLoggedIn: boolean;
}


export interface AppState {
    authentication: AuthenticationState;
    productResponse: ProductResponse;
}

export const selectFeature = (state: AppState) => state.authentication;

export const isLoggedInSelector = createSelector(
    selectFeature,
    (state: AuthenticationState) => state.isLoggedIn
);
