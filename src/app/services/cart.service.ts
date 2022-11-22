import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';
import { CartResponse } from '../types/cart';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private getCartByUserIdEndPoint = "/carts/user";
  constructor(private http: HttpClient) { }

  getUserCart(userId: number): Observable<CartResponse> {
    return this.http.get<CartResponse>(environment.apisURL + this.getCartByUserIdEndPoint + `/${userId}`)
  }

}
