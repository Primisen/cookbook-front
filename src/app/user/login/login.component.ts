import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  }

  showAlert = false
  alertMessage = 'Please wait! We are logging you in.'
  alertColor = 'blue'
  inSubmission = false

  async login() {

    this.showAlert = true
    this.alertMessage = 'Please wait! We are logging you in.'
    this.alertColor = 'blue'
    this.inSubmission = true

    try {
      console.log(this.credentials)
      this.inSubmission = true
    } catch (error) {
      this.alertMessage = 'An unexpected error occurred. Please try again later.'
      this.alertColor = 'red'
      this.inSubmission = false
      console.log(error)
      return
    }

    this.alertMessage = 'Success! You are now logged in!'
    this.alertColor = 'green'
  }
}
