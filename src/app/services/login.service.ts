import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private logInEndPoint = "https://dummyjson.com/auth/login";
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.logInEndPoint, {
      username,
      password
    })
  }


}
