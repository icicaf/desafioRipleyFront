import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SecurityService } from '../security.service';
import  Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private securityService: SecurityService) {}

  ngOnInit(): void {
    if (this.securityService.getFlagFirstVisit()) {
      Swal.fire('Demo Front App Angular');
    }
  }

  loginUser(form: NgForm) {
    this.securityService.login({
      customer_rut: form.value.rut,
      customer_password: form.value.password
    });
  }

  ngOnDestroy() {}
}
