import { Injectable } from '@angular/core';
import IUser from '../models/user.model';
import { Observable, of } from 'rxjs';
import { delay, filter, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated: Observable<boolean> = of(true)
  public isAuthenticatedWithDelay$: Observable<boolean>
  public redirect = false

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.isAuthenticatedWithDelay$ = this.isAuthenticated.pipe(
      delay(1000)
    )
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => this.route.firstChild),
      switchMap(route => route?.data ?? of({ authOnly: false }))
    ).subscribe((data) => {
      this.redirect = data.authOnly ?? false
    })
  }

  public async createUser(userData: IUser) {

    if (!userData.password) {
      throw new Error("Password not provided!")
    }

    this.isAuthenticated = of(true)
    console.log("Registration...")
  }

  public async logout($event?: Event) {
    if ($event) {
      $event.preventDefault()
    }

    if (this.redirect) {
      await this.router.navigateByUrl('/')
    }
  }
}
