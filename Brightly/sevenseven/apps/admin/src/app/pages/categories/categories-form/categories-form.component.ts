import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@sevenseven/products';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';

@Component({
    selector: 'admin-categories-form',
    templateUrl: './categories-form.component.html',
    styles: []
})
export class CategoriesFormComponent implements OnInit, OnDestroy {
    public categoriesForm!: FormGroup;
    isSubmitted = false;
    editMode = false;
    currentCategoryId?: string;
    endSubscription: Subject<any> = new Subject();

    constructor(
        private formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private location: Location,
        private activatedRoute: ActivatedRoute
    ) {}
    ngOnDestroy(): void {
        this.endSubscription.complete();
    }

    ngOnInit(): void {
        this.categoriesForm = this.formBuilder.group({
            name: ['', Validators.required],
            icon: ['', Validators.required],
            color: ['#fff']
        });

        this._checkEditMode();
    }
    onCancel(){
        this.location.back();
    }
    
    onSubmit() {
        this.isSubmitted = true;
        if (!this.categoriesForm.valid) {
            return;
        }

        const category: Category = {
            id: this.currentCategoryId,
            name: this.categoryForm['name'].value,
            icon: this.categoryForm['icon'].value,
            color: this.categoryForm['color'].value
        };

        if (this.editMode) {
            this._updateCategory(category);
        } else {
            this._addCategory(category);
        }
    }

    get categoryForm() {
        return this.categoriesForm.controls;
    }

    private _updateCategory(category: Category) {
        console.log(this.currentCategoryId);
        this.categoriesService.updateCategory(category).pipe(takeUntil(this.endSubscription)).subscribe(
            (category: Category) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: `Category ${category.name} updated successfully` });
                timer(2000)
                    .toPromise()
                    .then(() => {
                        this.location.back();
                    });
            },
            () => {
                this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Updating category failed' });
            }
        );
        console.log(this.categoryForm['name'].value);
        console.log(this.categoryForm['icon'].value);
    }

    private _addCategory(category: Category) {
        this.categoriesService.createCategory(category).pipe(takeUntil(this.endSubscription)).subscribe(
            (category: Category) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: `Category ${category.name} created successfully` });
                timer(2000)
                    .toPromise()
                    .then(() => {
                        this.location.back();
                    });
            },
            () => {
                this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Category creation failed' });
            }
            
        );
        console.log(this.categoryForm['name'].value);
        console.log(this.categoryForm['icon'].value);
    }
    private _checkEditMode() {
        this.activatedRoute.params.pipe(takeUntil(this.endSubscription)).subscribe((params) => {
            if (params['id']) {
                this.editMode = true;
                this.currentCategoryId = params['id'];
                this.categoriesService.getCategory(params['id']).pipe(takeUntil(this.endSubscription)).subscribe((category) => {
                    this.categoryForm['name'].setValue(category.name);
                    this.categoryForm['icon'].setValue(category.icon);
                    this.categoryForm['color'].setValue(category.color);
                });
            }
        });
    }
}
