import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'users-profile-icon',
  templateUrl: './profile-icon.component.html',
  styles: [
  ]
})
export class ProfileIconComponent implements OnInit, OnDestroy {

  constructor() { }
  ngOnDestroy(): void {
    window.location.reload();
  }

  ngOnInit(): void {
    
  }

}
