import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login, logout } from './NgRx/actions/authentication.actions';
import { AppState } from './NgRx/selectors';
import { isLoggedInSelector } from './NgRx/selectors/authentication.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  constructor(private router: Router, private store: Store<AppState>) {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    console.log({ isLoggedIn: this.isLoggedIn$ });
  }

  ngOnInit(): void {
    let token = localStorage.getItem("token")
    console.log({ token });

    // here we should check the token 
    // if it is valid 
    // we let the user enter 
    // and see the content of our website
    // else we should delete it and ask him 
    // to authintecate again (login)
    // but the code here is incomplete becuase 
    // I didn't the end point that can check the
    // token
    let tokenCheckerApi = true
    let isTokenValid = token && tokenCheckerApi
    // case I have no end point to do that so I will try to simulate it ;
    // true  
    if (isTokenValid) {
      this.store.dispatch(login())
      
      // if the token is valid do login  
    } else {
      // else navigate to login page and change isLoggedIn state to false and remove the token 
      // we delete the token to prevent our client from sending it again if the user make a reload 
      // to not prevent unnecessary requests  
      this.router.navigate(['/login'])
      this.store.dispatch(logout())
      localStorage.removeItem("token")
    }
  }


}
