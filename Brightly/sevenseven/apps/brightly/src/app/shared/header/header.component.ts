import { Component, OnInit } from '@angular/core';
import { AuthService } from '@sevenseven/users';

@Component({
    selector: 'brightly-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
    constructor(private authService:AuthService) {}

    ngOnInit(): void {}

    logoutUser() {
        this.authService.logout();
      }
}
