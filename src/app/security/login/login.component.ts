import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SecurityService } from '../security.service';
import  Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private securityService: SecurityService) {}

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

  ngOnDestroy() {

  }
}
