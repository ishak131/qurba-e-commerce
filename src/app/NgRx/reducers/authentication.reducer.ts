import { createReducer, on } from '@ngrx/store';
import { login, logout } from '../actions/authentication.actions';
import { AuthenticationState } from '../selectors';



export const initialState: AuthenticationState = {
  isLoggedIn: false
};


export const authenticationReducer = createReducer(
  initialState,
  on(login, (state) => ({ ...state, isLoggedIn: true })),
  on(logout, (state) => ({ ...state, isLoggedIn: false })),
);
