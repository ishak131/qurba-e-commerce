import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/types/user';
import { setUser } from '../actions/user.actions';

export const initialState: User = {
    id: 0,
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    image: "",
    token: "",
};

export const userReducer = createReducer(
    initialState,
    on(setUser, (state, { user }) => ({ ...user })),
);
