import { createAction, props } from "@ngrx/store";
import { User } from "src/app/types/user";


export const setUser = createAction('[User Component] SetUser', props<{ user: User }>());
