import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'users-profile-page',
  templateUrl: './profile-page.component.html',
  styles: [
  ]
})
export class ProfilePageComponent implements OnInit {
  user : any;
  unsubscribe$: Subject<any> = new Subject();
  userId?: string | any;
  isEditMode = false;
   public profileForm!: FormGroup | any;

  constructor(private usersService:UsersService,  private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this._getCurrentUser();
    this.profileForm = this.formBuilder.group({
      name: [{value: '', disabled: true}, Validators.required],
      email: [{value: '', disabled: true}, Validators.required],
      city: [{value: '', disabled: true}, Validators.required],
      country: [{value: '', disabled: true}, Validators.required],
      zip: [{value: '', disabled: true}, Validators.required],
  });
  }

  private _getCurrentUser() {
    this.usersService
    .observeCurrentUser().subscribe((user) => {
     this.user = user;
     this.profileForm.get('name').patchValue(this.user.name);
     this.profileForm.get('email').setValue(this.user.email);
     this.profileForm.get('city').setValue(this.user.city);
     this.profileForm.get('country').setValue(this.user.country);
     this.profileForm.get('zip').setValue(this.user.zip);
    });
  }

  editProfile () {
    if(!this.isEditMode){
      this.isEditMode = true;
    }else{
      this.isEditMode = false;

      this.profileForm.get('name').disabled = false;
    
    const user: User = {
       id: this.user.id,
        name: this.profileForm['name'].value,
        email: this.profileForm['email'].value,
        city: this.profileForm['city'].value,
        country: this.profileForm['country'].value,
        zip: this.profileForm['zip'].value,
    };
    this.usersService.updateUser(user).pipe().subscribe();
    console.log(this.user.id);
    }
  }

}
