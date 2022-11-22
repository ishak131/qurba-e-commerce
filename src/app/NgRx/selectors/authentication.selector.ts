import { createSelector } from '@ngrx/store';
import { AuthenticationState } from 'src/app/types/authentication';
import { AppState } from '.';



export const selectFeature = (state: AppState) => state.authentication;

export const isLoggedInSelector = createSelector(
    selectFeature,
    (state: AuthenticationState) => state.isLoggedIn
);