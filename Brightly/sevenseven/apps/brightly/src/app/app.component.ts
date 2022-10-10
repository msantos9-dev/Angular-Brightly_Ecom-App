import { Component, OnInit } from '@angular/core';
import { UsersService } from '@sevenseven/users';

@Component({
  selector: 'brightly-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'brightly';
  
  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.initAppSession();
  }
}
