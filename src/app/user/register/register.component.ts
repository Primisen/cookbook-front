import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import IUser from '../../models/user.model';
import { RegisterValidators } from '../validators/register-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  inSubmission = false

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ])
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  age = new FormControl<number | null>(null, [
    Validators.required,
    Validators.min(18),
    Validators.max(120)
  ])
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ])
  confirmPassword = new FormControl('', [
    Validators.required
  ])
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13)
  ])

  showAlert = false
  alertMessage = 'Please wait! Your  account is beign created.'
  alertColor = 'blue'

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirmPassword: this.confirmPassword,
    phoneNumber: this.phoneNumber,
  }, [RegisterValidators.match('password', 'confirmPassword')])

  constructor(
    private authService: AuthService
  ) { }

  async register() {

    this.inSubmission = true

    try {
      await this.authService.createUser(this.registerForm.value as unknown as IUser)
    } catch (error) {
      console.error(error)
      this.showAlert = true
      this.alertMessage = 'An unexpected error occurred. Please try again later.'
      this.alertColor = 'red'
      this.inSubmission = false
      return
    }

    this.showAlert = true
    this.alertMessage = 'Success! Your account has been created.'
    this.alertColor = 'green'
  }
}
