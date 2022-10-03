import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  constructor(public authService: AuthService) {}

  signinForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  get password() {
    return this.signinForm.get('password')
  }

  get email() {
    return this.signinForm.get('email')
  }

  ngOnInit() { }

  signIn() {
    this.authService.signIn(this.signinForm.value)
  }
}

