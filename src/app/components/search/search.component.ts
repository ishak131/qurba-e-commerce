import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setProductsFromSearch } from 'src/app/NgRx/actions/products.actions';
import { AppState } from 'src/app/NgRx/selectors';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  keyword$: string = ""

  constructor(private productService: ProductsService, private store: Store<AppState>, private router: Router) {

  }

  searchProducts(): void {
    this.productService.getProductsBySearch(this.keyword$).subscribe(({ products, total }) => {
      let total$ = this.keyword$ ? total : 0
      this.store.dispatch(setProductsFromSearch({ total: total$, products }))
      this.router.navigate(["/products"], {
        queryParams: { search: this.keyword$ },
      })
    })
  }

  onChangeSearchInput(event: Event): void {
    let target = event.target as HTMLInputElement
    this.keyword$ = target.value
  }

}
