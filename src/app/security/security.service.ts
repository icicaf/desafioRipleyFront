import { Subject } from 'rxjs';
import { Customer } from './customer.model';
import { CustomerRegister } from './customer-register.model';
import { LoginData } from './login-data.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  securityChanged = new Subject<boolean>();
  baseUrl = environment.baseUrl;
  private token: string;
  private customer?: Customer;
  data:any={};

  chargeUser(): void {
    const tokenBrowser = localStorage.getItem('token');
    if (!tokenBrowser) {
      return;
    }
    this.token = tokenBrowser;
    this.securityChanged.next(true);

    const data = {"customer_rut":"12","customer_password":"12"}
    console.log('login');

    this.http.post<Customer>(this.baseUrl + 'api/customer/login',data ).subscribe((response) => {
      console.log('login respuesta', response);
      this.token = response.token;
      this.data = response;
        const tempdata = this.data.data;
        this.customer = {
          customer_id: tempdata.customer_id,
          customer_rut: tempdata.customer_rut,
          customer_name: tempdata.customer_name,
          customer_mail: tempdata.customer_mail,
          token: response.token
        };
        console.log('login',response.token);
      this.securityChanged.next(true);
      localStorage.setItem('token', response.token);
    });
  }

  getToken() { return this.token;}

  constructor(private router: Router, private http: HttpClient) { this.token = '';}

  registerUser(customerRegister: CustomerRegister): void {
    this.http.post<{register: string}>(this.baseUrl + 'api/customer/register', customerRegister)
    .subscribe((response) => {
      if(response.register) {
        this.securityChanged.next(true);

        this.router.navigate(['/login']);
      } else {
        console.log("Error al resgistrar");
    }});
  }

  login(loginData: LoginData) {
    this.http.post<any>(this.baseUrl + 'api/customer/login', loginData)
      .subscribe((response) => {
        this.data = response;
        const tempdata = this.data.data;
        this.customer = {
          customer_id: tempdata.customer_id,
          customer_rut: tempdata.customer_rut,
          customer_name: tempdata.customer_name,
          customer_mail: tempdata.customer_mail,
          token: response.token
        };

        this.securityChanged.next(true);
        localStorage.setItem('token', response.token);
        sessionStorage.setItem('customerId', this.customer.customer_id);
        this.router.navigate(['/']);
    });
  }

  logout() {
    this.customer = null as any;;
    this.securityChanged.next(false);
    sessionStorage.removeItem('customerId')
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getUser() {
    return {...this.customer};
  }

  onSession() {
    return this.token != null;
  }
}
