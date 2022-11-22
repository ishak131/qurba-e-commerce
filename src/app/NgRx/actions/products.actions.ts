import { createAction, props } from '@ngrx/store';
import { Product, ProductResponse } from 'src/app/types/product';

export const setProducts = createAction('[Products Component] setProducts', props<{ products: Product[] }>());
export const setProductsFromGetByCategory = createAction('[Products Component] setProductsFromGetByCategory', props<{ productResponse: ProductResponse }>());
export const setProductsFromSearch = createAction('[Products Component] setProductsFromSearch', props<{ products: Product[], total: number }>());
export const setProductResponse = createAction('[Products Component] setProductResponse', props<{ productResponse: ProductResponse }>());
export const resetProducts = createAction('[Products Component] resetProducts');