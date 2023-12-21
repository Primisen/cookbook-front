import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  constructor(
    public modal: ModalService,
    public authService: AuthService
  ) {
  }

  openModal($event: Event) {
    $event.preventDefault()

    this.modal.toggleModal('auth')
  }

  logout($event: Event) {
    $event.preventDefault()
  }
}
