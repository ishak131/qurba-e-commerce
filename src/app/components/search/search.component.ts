import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setProductResponse, setProductsFromSearch } from 'src/app/NgRx/actions/products.actions';
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
    //if the keyword exists search in products 
    // else go to products page root to reload 
    // original products
    this.keyword$ ? this.productService.getProductsBySearch(this.keyword$).subscribe((productResponse) => {
      this.store.dispatch(setProductResponse({ productResponse }))
      this.router.navigate(["/products"], {
        queryParams: { search: this.keyword$ },
      })
    }) : this.router.navigate(['/products'])
  }

  onChangeSearchInput(event: Event): void {
    let target = event.target as HTMLInputElement
    this.keyword$ = target.value
  }

}
