import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setCart } from 'src/app/NgRx/actions/cart.actions';
import { AppState } from 'src/app/NgRx/selectors';
import { cartSelector } from 'src/app/NgRx/selectors/cart.selector';
import { userIdSelector } from 'src/app/NgRx/selectors/user.selector';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/types/cart';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {

  userId$: Observable<number>
  cartInfo$: Observable<Cart>
  id: number = 0;
  products: Product[] = [];
  total: number = 0
  discountedTotal: number = 0
  userId: number = 0
  totalProducts: number = 0
  totalQuantity: number = 0

  constructor(private cartService: CartService, private store: Store<AppState>) {
    this.userId$ = store.pipe(select(userIdSelector))
    this.cartInfo$ = store.pipe(select(cartSelector))
    this.userId$.subscribe(userId$ =>
      this.cartService.getUserCart(userId$).subscribe(({ carts }) => {
        this.store.dispatch(setCart({ cart: carts[0] }))
      }))
  }

  ngOnInit(): void {

    this.cartInfo$.subscribe(({ id, products, total, discountedTotal, userId, totalProducts, totalQuantity }) => {
      this.id = id
      this.products = products
      this.total = total
      this.discountedTotal = discountedTotal
      this.userId = userId
      this.totalProducts = totalProducts
      this.totalQuantity = totalQuantity
    })
  }
  
}