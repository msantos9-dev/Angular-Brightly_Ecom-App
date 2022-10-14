import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '@sevenseven/users';

@Component({
  selector: 'users-profile-icon',
  templateUrl: './profile-icon.component.html',
  styles: [
  ]
})
export class ProfileIconComponent implements OnInit, OnDestroy {
 


  constructor(private usersService: UsersService,) { }
  ngOnDestroy(): void {
    window.location.reload();
  }


  ngOnInit(): void {
   
  }

 

}
