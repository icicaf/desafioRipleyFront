import { Subject } from 'rxjs';
import { User } from './user.model';
import { LoginData } from './login-data.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  baseUrl: string = environment.baseUrl;

  securityChanged = new Subject<boolean>();
  private user?: User;


  constructor(private router: Router, private http: HttpClient) {}

  registerUser(user: User) {
    this.user = {
      rut: user.rut,
      name: user.name,
      userId: '',
      email: user.email,
      password: user.password
    };

    this.http.post<{action: boolean}>(this.baseUrl + 'api/customers/register', user)
    .subscribe((response) => {
      if(response.action) {
        this.user = {
          rut: '',
          name: '',
          userId: '',
          email: '',
          password: ''
        };

        this.securityChanged.next(true);
        this.router.navigate(['/']);
      } else {
        return
      }
  });

    this.router.navigate(['/login']);
  }

  login(loginData: LoginData) {
    this.http.post<{login: boolean}>(this.baseUrl + 'api/customers', loginData)
      .subscribe((response) => {
        if(response.login) {
          this.user = {
            rut: loginData.customer_rut,
            name: '',
            userId: '',
            email: '',
            password: ''
          };

          this.securityChanged.next(true);
          this.router.navigate(['/']);
        } else {
          return
        }
    });
  }

  logout() {
    this.user = {
      rut: '',
      name: '',
      userId: '',
      email: '',
      password: ''
    };

    this.securityChanged.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return {...this.user};
  }

  onSession() {
    return this.user != null;
  }
}
