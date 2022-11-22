import { createAction, props } from "@ngrx/store";
import { Cart } from "src/app/types/cart";


export const setCart = createAction('[Cart Component] setCart', props<{ cart: Cart }>());
