import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setProductResponse } from 'src/app/NgRx/actions/products.actions';
import { AppState } from 'src/app/NgRx/selectors';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  searchKeyWord: string = ""
  searchKeyWordInputValue: string = ""
  constructor(private productService: ProductsService, private store: Store<AppState>, private router: Router, private activatedRoute: ActivatedRoute) {

  }

  searchProducts(): void {
    this.productService.getProductsBySearch(this.searchKeyWord).subscribe((productResponse) => {
      this.store.dispatch(setProductResponse({ productResponse }))
    })
  }

  updateSearchParameter() {
    this.searchKeyWordInputValue ? this.router.navigate(["/products"], {
      queryParams: { search: this.searchKeyWordInputValue },
    }).then(() => {
      window.location.reload()
    }) :
      this.router.navigate(["/products"], {
        queryParams: { selectedPage: 0 },
      }).then(() => {
        window.location.reload()
      })
  }

  onChangeSearchInput(event: Event): void {
    let target = event.target as HTMLInputElement
    this.searchKeyWordInputValue = target.value
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.searchKeyWord = params['search']
      this.searchKeyWord && this.searchProducts()
    });
  }

}
