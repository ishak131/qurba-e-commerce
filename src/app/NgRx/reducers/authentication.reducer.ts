import { createReducer, on } from '@ngrx/store';
import { AuthenticationState } from 'src/app/types/authentication';
import { login, logout } from '../actions/authentication.actions';

export const initialState: AuthenticationState = {
  isLoggedIn: false
};

export const authenticationReducer = createReducer(
  initialState,
  on(login, (state) => ({ ...state, isLoggedIn: true })),
  on(logout, (state) => ({ ...state, isLoggedIn: false })),
);
