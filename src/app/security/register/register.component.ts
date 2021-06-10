import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../security.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {}

  registerUser(form: NgForm) {
    this.securityService.registerUser({
      customer_rut: form.value.rut,
      customer_name: form.value.name,
      customer_mail: form.value.mail,
      customer_password: form.value.password
    });
  }

}
