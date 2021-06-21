import { Subject } from 'rxjs';
import { Customer } from './customer.model';
import { CustomerRegister } from './customer-register.model';
import { LoginData } from './login-data.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import  Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private token?: any;
  baseUrl = environment.baseUrl;
  securityChanged = new Subject<boolean>();
  private customer!: Customer;

  chargeUser(): void {
    const tokenBrowser = localStorage.getItem('token');
    console.log("tokenBrowser",tokenBrowser);
    if (!tokenBrowser && tokenBrowser === null) {
      console.log("salio");
      return;
    }

    console.log("continuo",tokenBrowser);
    this.token = tokenBrowser;
    this.securityChanged.next(true);

    this.http.get<any>(this.baseUrl + 'api/customer/'+localStorage.getItem('customerId')).subscribe((response) => {
      console.log('login respuesta changue', response);
      this.token = response.token;
      this.customer = {
        customer_id: response.data.customer_id,
        customer_rut: response.data.customer_rut,
        customer_name: response.data.customer_name,
        customer_mail: response.data.customer_mail,
        token: response.token
      };
      this.securityChanged.next(true);
      localStorage.setItem('token', response.token);
    });
  }

  getToken(): string {
    return this.token;
  }

  constructor(private router: Router, private http: HttpClient) {}

  registerUser(customerRegister: CustomerRegister): void {
    this.http.post<{register: string}>(this.baseUrl + 'api/customer/register', customerRegister)
    .subscribe((response) => {
      if(response.register) {
        this.router.navigate(['/login']);
      } else {
        //console.log("Error al resgistrar");
    }});
  }

  login(loginData: LoginData): void {
    this.http
    .post<any>(this.baseUrl + 'api/customer/login', loginData)
      .subscribe((response) => {
      console.log('login respuesta', response);

      this.token = response.token;
      if(this.token) {
        this.customer = {
          customer_id: response.data.customer_id,
          customer_rut:  response.data.customer_rut,
          customer_name:  response.data.customer_name,
          customer_mail:  response.data.customer_mail,
          token: response.token,
        };

        this.securityChanged.next(true);
        localStorage.setItem('customerId', response.data.customer_id);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error en sus credenciales',
          text: 'Si no esta registrado por favor registrar'
        });
        return;
      }
    });
  }

  getFlagFirstVisit() :boolean {
    if (localStorage.getItem('flagFirstVisit') === null) {
      localStorage.setItem('flagFirstVisit', 'true');
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.customer = null as any;
    this.securityChanged.next(false);
    localStorage.removeItem('customerId');
    localStorage.removeItem('token');
    localStorage.removeItem('flagFirstVisit');
    this.router.navigate(['/login']);
  }

  getUser() {
    return {...this.customer};
  }

  onSession() {
    return this.token != null;
  }
}
