import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@sevenseven/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html',
    styles: []
})
export class CategoriesListComponent implements OnInit, OnDestroy {
    categories: Category[] = [];
    endSubscription: Subject<any> = new Subject();

    constructor(
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}
    ngOnDestroy(): void {
        this.endSubscription.complete();
    }

    ngOnInit(): void {
        this._getCategories();
        
    }

    deleteCategory(categoryId: string) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this category?',
            header: 'Delete Category',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.categoriesService.deleteCategory(categoryId).pipe(takeUntil(this.endSubscription)).subscribe(
                    () => {
                        this._getCategories();
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category deleted successfully' });
                    },
                    () => {
                        this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Category deletion failed' });
                    }
                );
            },
            reject: () => {
                this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            }
        });
    }

    updateCategory(categoryId: string) {
        this.router.navigateByUrl(`categories/form/${categoryId}`);
    }

    private _getCategories() {
        this.categoriesService.getCategories().pipe(takeUntil(this.endSubscription)).subscribe((categories) => {
            this.categories = categories;
        });
    }
}
