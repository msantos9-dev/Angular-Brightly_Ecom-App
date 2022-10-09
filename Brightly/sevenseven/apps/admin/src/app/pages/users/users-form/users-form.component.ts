import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UsersService } from '@sevenseven/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import * as countriesLib from 'i18n-iso-countries';
declare const require: (arg0: string) => countriesLib.LocaleData;
@Component({
    selector: 'admin-users-form',
    templateUrl: './users-form.component.html',
    styles: []
})
export class UsersFormComponent implements OnInit {
    usersForm!: FormGroup;
    isSubmitted = false;
    editMode = false;
    currentUserId!: string;
    countries: any = [];

    constructor(
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        private usersService: UsersService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._initUserForm();
        this._checkEditMode();
        this._getCountries();
    }

    private _checkEditMode() {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.editMode = true;
                this.currentUserId = params['id'];
                this.usersService.getUser(params['id']).subscribe((user) => {
                    this.userForm['name'].setValue(user.name);
                    this.userForm['email'].setValue(user.email);
                    this.userForm['phone'].setValue(user.phone);
                    this.userForm['isAdmin'].setValue(user.isAdmin);
                    this.userForm['street'].setValue(user.street);
                    this.userForm['apartment'].setValue(user.apartment);
                    this.userForm['zip'].setValue(user.zip);
                    this.userForm['city'].setValue(user.city);
                    this.userForm['country'].setValue(user.country);

                    this.userForm['password'].setValidators([]);
                    this.userForm['password'].updateValueAndValidity();
                });
            }
        });
    }

    private _initUserForm() {
        this.usersForm = this.formBuilder.group({
            name: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            isAdmin: [false],
            street: [''],
            apartment: [''],
            zip: [''],
            city: [''],
            country: ['']
        });
    }

    get userForm() {
        return this.usersForm.controls;
    }
    onSubmit() {
        this.isSubmitted = true;
        if (this.usersForm.invalid) {
            return;
        }
        const user: User = {
            id: this.currentUserId,
            name: this.userForm['name'].value,
            email: this.userForm['email'].value,
            password: this.userForm['password'].value,
            phone: this.userForm['phone'].value,
            isAdmin: this.userForm['isAdmin'].value,
            street: this.userForm['street'].value,
            apartment: this.userForm['apartment'].value,
            zip: this.userForm['zip'].value,
            city: this.userForm['city'].value,
            country: this.userForm['country'].value
        };
        if (this.editMode) {
            this._updateUser(user);
        } else {
            this._addUser(user);
        }
    }

    private _getCountries() {
        countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));

        this.countries = Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
            return {
                id: entry[0],
                name: entry[1]
            };
        });
    }

    private _addUser(user: User) {
        this.usersService.createUser(user).subscribe(
            (user: User) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `User ${user.name} is created!`
                });
                timer(2000)
                    .toPromise()
                    .then(() => {
                        this.router.navigateByUrl(`users`);
                    });
            },
            () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'User is not created!'
                });
            }
        );
    }

    private _updateUser(user: User) {
        this.usersService.updateUser(user).subscribe(
            () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'User is updated!'
                });
                timer(2000)
                    .toPromise()
                    .then(() => {
                        this.router.navigateByUrl(`users`);
                    });
            },
            () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'User is not updated!'
                });
            }
        );
    }

    onCancel() {
        this.router.navigateByUrl(`users`);
    }
}
