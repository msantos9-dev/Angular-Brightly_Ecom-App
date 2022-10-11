import { Component, OnInit } from '@angular/core';
import { AuthService } from '@sevenseven/users';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {

  visibleSidebar1: any;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  
  logoutUser() {
    this.authService.logout();
  }


}
