import { createSelector } from '@ngrx/store';

export interface AuthenticationState {
    isLoggedIn: boolean;
}

export interface AppState {
    authentication: AuthenticationState;
}

export const selectFeature = (state: AppState) => state.authentication;

export const isLoggedInSelector = createSelector(
    selectFeature,
    (state: AuthenticationState) => state.isLoggedIn
);
