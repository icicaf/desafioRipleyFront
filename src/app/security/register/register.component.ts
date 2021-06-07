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
    console.log(form);
    this.securityService.registerUser({
      rut: form.value.rut,
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
      userId: ''
    });
  }

}
