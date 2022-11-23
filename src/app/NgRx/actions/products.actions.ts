import { createAction, props } from '@ngrx/store';
import { ProductResponse } from 'src/app/types/product';

export const setProductsFromGetByCategory = createAction('[Products Component] setProductsFromGetByCategory', props<{ productResponse: ProductResponse }>());
export const setProductResponse = createAction('[Products Component] setProductResponse', props<{ productResponse: ProductResponse }>());
export const resetProducts = createAction('[Products Component] resetProducts');