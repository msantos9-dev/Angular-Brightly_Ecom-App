import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@sevenseven/users';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
    selector: 'admin-users-list',
    templateUrl: './users-list.component.html',
    styles: []
})
export class UsersListComponent implements OnInit {
    users: User[] = [];

    constructor(
        private usersService: UsersService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._getUsers();
    }

    deleteUser(userId: string) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this user?',
            header: 'Delete User',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.usersService.deleteUser(userId).subscribe(
                    () => {
                        this._getUsers();
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User deleted successfully' });
                    },
                    () => {
                        this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'User deletion failed' });
                    }
                );
            },
            reject: () => {
                this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            }
        });
    }

    updateUser(userId: string) {
        this.router.navigateByUrl(`users/form/${userId}`);
    }

    private _getUsers() {
        this.usersService.getUsers().subscribe((users) => {
            this.users = users;
        });
    }
}
