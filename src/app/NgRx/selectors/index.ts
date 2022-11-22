import { AuthenticationState } from 'src/app/types/authentication';
import { ProductResponse } from 'src/app/types/product';
import { User } from 'src/app/types/user';

export interface AppState {
    authentication: AuthenticationState;
    productResponse: ProductResponse;
    user: User;
}

