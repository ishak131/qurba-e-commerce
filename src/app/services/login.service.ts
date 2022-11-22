import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private logInEndPoint = "/auth/login";
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(environment.apisURL + this.logInEndPoint, {
      username,
      password
    })
  }


}
