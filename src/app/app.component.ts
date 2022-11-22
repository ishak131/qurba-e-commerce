import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login, logout } from './NgRx/actions/authentication.actions';
import { setUser } from './NgRx/actions/user.actions';
import { AppState } from './NgRx/selectors';
import { isLoggedInSelector } from './NgRx/selectors/authentication.selector';
import { User } from './types/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  constructor(private router: Router, private store: Store<AppState>) {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));

  }

  ngOnInit(): void {
    let token = localStorage.getItem("token")
    // here we should check the token 
    // if it is valid 
    // we let the user enter 
    // and see the content of our website
    // else we should delete it and ask him 
    // to authintecate again (login)
    // but the code here is incomplete becuase 
    // I didn't find the end point that can check the
    // token
    let tokenCheckerApi = true
    let isTokenValid = token && tokenCheckerApi
    // case I have no end point to do that so I will try to simulate it ;
    // true  
    if (isTokenValid) {
      // if the token is valid do login  
      this.store.dispatch(login());
      // I know it is not the best way to do it but all depends on the check authority endpoint and I couldn't find it 
      // here I should check if the token is valid or not and if it valid the end point should return some info about 
      //  the user and this info should be in NgRx state (redux state) to be accessable from every where in the application
      // also I know that we should use get one user endpoint to get user data but we will need the id from the check auth 
      let user: string = localStorage.getItem("user") || '{}';
      let userData: User = JSON.parse(user);
      this.store.dispatch(setUser({ user: userData }))

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
