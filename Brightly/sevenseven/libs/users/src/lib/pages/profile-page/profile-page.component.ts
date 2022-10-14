import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { enableDebugTools } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'users-profile-page',
    templateUrl: './profile-page.component.html',
    styles: []
})
export class ProfilePageComponent implements OnInit, OnDestroy {
    form: FormGroup | any;
    isSubmitted = false;
    updatemode = false;
    currentUserId: string | undefined;
    countries: any;
    endsubs$: Subject<any> = new Subject();
    user: any;

    constructor(
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        private usersService: UsersService,
        private route: ActivatedRoute,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    private _getCurrentUser() {
        this.usersService.observeCurrentUser().subscribe((user) => {
            this.user = user;
            this.form?.get('name').patchValue(this.user?.name);
            this.form?.get('email').patchValue(this.user?.email);
            this.form?.get('phone').patchValue(this.user?.phone);
            this.form?.get('street').patchValue(this.user?.street);
            this.form?.get('apartment').patchValue(this.user?.apartment);
            this.form?.get('zip').patchValue(this.user?.zip);
            this.form?.get('city').patchValue(this.user?.city);
            this.form?.get('country').patchValue(this.user?.country);
        });
    }

    ngOnInit(): void {
        this._initUserForm();
        this._getCountries();
        this._checkUpdateMode();
    }
    ngOnDestroy(): void {
        window.location.reload();
        this.endsubs$.next(this.endsubs$);
        this.endsubs$.complete();
    }

    private _initUserForm() {
        this.updatemode =false;
        this._getCurrentUser();
        this.form = this.formBuilder.group({
            name: [{ value: ''}, Validators.required],
            email: [{ value: ''}, [Validators.required, Validators.email]],
            phone: [{ value: ''}, Validators.required],
            street: [{ value: '', }],
            apartment: [{ value: '' }],
            zip: [{ value: ''}],
            city: [{ value: '' }],
            country: [{ value: ''}]
        });
        // }
    }

    private _getCountries() {
        this.countries = this.usersService.getCountries();
    }

    private _updateUser(user: User) {
        this.confirmationService.confirm({
            message: 'Do you want save the Changes?',
            header: 'Update Profile',
            icon: 'pi pi-info',
            accept: () => {
                //alert('Update user: ' + user.id);
                this.usersService
                    .updateUser(user)
                    .pipe(takeUntil(this.endsubs$))
                    .subscribe({
                        complete: () => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: `Your Profile is updated!`
                            });
                            timer(2000)
                                .toPromise()
                                .then(() => {
                                    this.router.navigateByUrl(`profile`);
                                    this.updatemode = false;
                                });
                        },
                        error: () => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'User is not updated!'
                            });
                        }
                    });
            }
        });
    }

    private _checkUpdateMode() {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.updatemode = true;
                this.currentUserId = params['id'];
                this.usersService.getUser(params['id']).subscribe((user) => {
                    this.userForm['name'].setValue(user.name)?.enable();
                    this.userForm['email'].setValue(user.email);
                    this.userForm['phone'].setValue(user.phone);
                    this.userForm['street'].setValue(user.street);
                    this.userForm['apartment'].setValue(user.apartment);
                    this.userForm['zip'].setValue(user.zip);
                    this.userForm['city'].setValue(user.city);
                    this.userForm['country'].setValue(user.country);
                });
            }
        });
    }

    onSubmit() {
        if (this.updatemode) {

            if (this.form?.invalid) {
                return;
            }
            const user: User = {
                id: this.currentUserId,
                name: this.userForm['name'].value,
                email: this.userForm['email'].value,
                phone: this.userForm['phone'].value,
                street: this.userForm['street'].value,
                apartment: this.userForm['apartment'].value,
                zip: this.userForm['zip'].value,
                city: this.userForm['city'].value,
                country: this.userForm['country'].value
            };

            this._updateUser(user);
        } else {
            this.updatemode = false;
            this.router.navigateByUrl(`profile/${this.user.id}`);
        }
    }

    onCancel() {
        window.location.reload();
    }

    get userForm() {
        return this.form.controls;
    }
}
