import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/types/product';

export const setProducts = createAction('[Products Component] setProducts', props<{ products: Product[] }>());
export const setProductsFromGetByCategory = createAction('[Products Component] setProductsFromGetByCategory', props<{ products: Product[] }>());
export const setProductsFromSearch = createAction('[Products Component] setProductsFromSearch', props<{ products: Product[], total: number }>());