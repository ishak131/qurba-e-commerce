import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/NgRx/selectors';
import { isLoggedInSelector } from '../../NgRx/selectors/authentication.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  @Input() isLogged: boolean = false;

  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
  }

  ngOnInit(): void {

  }

}
