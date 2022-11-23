import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { resetProducts, setProductsFromGetByCategory } from 'src/app/NgRx/actions/products.actions';
import { AppState } from 'src/app/NgRx/selectors';
import { ProductsService } from 'src/app/services/products.service';
import { ProductResponse } from 'src/app/types/product';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  filter: string[] = []

  @Input() searchKeyWord: string = ""
  @Input() isAllProducts: boolean = false
  @Input() selectedPage: number = 0;
  @Input() getAllProducts: () => void = () => { }


  seletedCategories: string[] = []
  categories$: string[] = [];

  constructor(private productsService: ProductsService, private store: Store<AppState>, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.filter = params['filter']
    })
  }

  addCategory(category$: string): void {
    let seletedCategories = this.seletedCategories
    seletedCategories.push(category$)
    this.seletedCategories = [...seletedCategories]
  }

  removeCategory(category$: string): void {
    (this.seletedCategories = [...this.seletedCategories.filter(category => category !== category$)])
  }

  onCheckBoxChange(event: Event): void {
    this.searchKeyWord = ""
    const target = event.target as HTMLInputElement;
    target.checked ? this.addCategory(target.id) : this.removeCategory(target.id)
    this.seletedCategories.length ?
      this.getProductsByCategory() :
      this.router.navigate(['products'], {
        queryParams: { selectedPage: this.seletedCategories },
      }).then(() => {
        this.getAllProducts()
      })
  }

  getProductsByCategory(): void {
    this.isAllProducts = false;
    this.router.navigate(['products'], {
      queryParams: { filter: this.seletedCategories },
    })
    this.store.dispatch(resetProducts());

    this.seletedCategories.map((category) => {
      this.productsService.getProductsByCategory(category).subscribe((productResponse: ProductResponse) => {
        this.store.dispatch(setProductsFromGetByCategory({ productResponse }));
      })
    })
  
  }

  isChecked(category: string): boolean {
    return this.seletedCategories.includes(category)
  }
  fillArrayFromFilterURLParameter(): void {
    if (typeof this.filter === "string") {
      this.seletedCategories[0] = this.filter
    } else
      this.seletedCategories = this.filter

    this.getProductsByCategory()
  }

  ngOnInit(): void {
    console.log(this.filter);

    this.productsService.getCategories().subscribe(categories => {
      this.categories$ = categories
    })


    if (this.filter?.length > 0 && this.seletedCategories.length === 0)
      this.fillArrayFromFilterURLParameter()
    this.searchKeyWord && (this.seletedCategories = [])

    console.log(this.seletedCategories);
  }

}
