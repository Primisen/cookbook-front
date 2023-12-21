import { Injectable } from '@angular/core';
import IUser from '../models/user.model';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated: Observable<boolean> = of(false)
  public isAuthenticatedWithDelay$: Observable<boolean>

  constructor() {
    this.isAuthenticatedWithDelay$ = this.isAuthenticated.pipe(
      delay(1000)
    )
  }

  public async createUser(userData: IUser) {

    if (!userData.password) {
      throw new Error("Password not provided!")
    }

    this.isAuthenticated = of(true)
    console.log("Registration...")
  }
}
