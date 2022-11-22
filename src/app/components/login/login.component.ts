import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/NgRx/selectors';
import { login } from 'src/app/NgRx/actions/authentication.actions';
import { isLoggedInSelector } from 'src/app/NgRx/selectors/authentication.selector';
import { setUser } from 'src/app/NgRx/actions/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";
  isLoggedIn$: Observable<boolean>;

  constructor(private loginService: LoginService, private router: Router, private store: Store<AppState>) {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
  }

  ngOnInit(): void {
    // here we are preventing user from making login again 
    // so if he is logged in we prevent him from accessing 
    // log in page :>
    this.isLoggedIn$.subscribe(
      state => state && this.router.navigate(['/']))
  }

  login() {
    this.loginService.login(this.email, this.password).subscribe((userData) => {
      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData));
      this.store.dispatch(login());
      this.store.dispatch(setUser({ user: userData }))
      this.router.navigate(['/']);
    })
  }
}
