import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout } from 'src/app/NgRx/actions/authentication.actions';
import { AppState } from 'src/app/NgRx/selectors';
import { userSelector } from 'src/app/NgRx/selectors/user.selector';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userInfo$: Observable<User>;
  id: number = 0
  username: string = ""
  email: string = ""
  firstName: string = ""
  lastName: string = ""
  gender: string = ""
  image: string = ""

  constructor(private store: Store<AppState>) {
    this.userInfo$ = this.store.pipe(select(userSelector))
  }

  // in log out we clear the localstorage and all saved data in cookies 
  // also we change isLoggedIn state to false not to display profile products 
  // and other pages that needs authentication
  logOut() {
    localStorage.clear()
    this.store.dispatch(logout())
    window.location.reload()
  }

  ngOnInit(): void {
    
    this.userInfo$.subscribe(({ id, username, email, firstName, lastName, gender, image }) => {
      this.id = id;
      this.username = username;
      this.email = email;
      this.firstName = firstName;
      this.lastName = lastName;
      this.gender = gender;
      this.image = image;
    })
  }


}
