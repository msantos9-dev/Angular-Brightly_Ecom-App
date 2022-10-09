import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService, Product, CategoriesService, Category } from '@sevenseven/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
    selector: 'admin-products-form',
    templateUrl: './products-form.component.html',
    styles: []
})
export class ProductsFormComponent implements OnInit {
  editMode = false;
  productsForm!: FormGroup;
  isSubmitted = false;
  categories: Category[] = [];
  imageDisplay!: string | ArrayBuffer | null | undefined ;
  currentProductId!: string;
  

    constructor(private formBuilder: FormBuilder, private categoriesService:CategoriesService, private productsService:ProductsService, private route: ActivatedRoute,
      private messageService:MessageService, private router:Router) {}

    ngOnInit(): void {
        this._initForm();
        this._getCategories();
        this._checkEditMode();
    }

    private _initForm() {
        this.productsForm = this.formBuilder.group({
            name: ['', Validators.required],
            brand: ['', Validators.required],
            price: ['', Validators.required],
            category: ['', Validators.required],
            countInStock: ['', Validators.required],
            description: ['', Validators.required],
            richDescription: [''],
            image: ['', Validators.required],
            isFeatured: [false]
        });
    }

    get productForm() {
      return this.productsForm.controls;
    }

    onSubmit() {
      this.isSubmitted = true;
      if (this.productsForm.invalid) return;
  
      const productFormData = new FormData();
      Object.keys(this.productForm).map((key) => {
        productFormData.append(key, this.productForm[key].value);
      });
      if (this.editMode) {
        this._updateProduct(productFormData);
      } else {
        this._addProduct(productFormData);
      }
  
    }

    onCancel() {
      this.router.navigateByUrl(`products`);
    }

    private _getCategories() {
      this.categoriesService.getCategories().subscribe((data) => {
        this.categories = data;
    });
    }

    private _updateProduct(productFormData: FormData){
      this.productsService.updateProduct(productFormData, this.currentProductId).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product is updated!'
          });
          timer(2000)
            .toPromise()
            .then(() => {
              this.router.navigateByUrl(`products`);
            });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Product is not updated!'
          });
        }
      );
  
    }

    private _addProduct(productData: FormData) {
      this.productsService.createProduct(productData).subscribe(
        (product: Product) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Product ${product.name} is created!`
          });
          timer(2000)
            .toPromise()
            .then(() => {
             this.router.navigateByUrl(`products`);
            });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Product is not created!'
          });
        }
      );
    }
  
  

    private _checkEditMode(){
      this.route.params.subscribe((params) => {
        if (params['id']) {
          this.editMode = true;
          this.currentProductId = params['id'];
          this.productsService.getProduct(params['id']).subscribe((product) => {
            this.productForm['name'].setValue(product.name);
            this.productForm['category'].setValue(product.category?.id);
            this.productForm['brand'].setValue(product.brand);
            this.productForm['price'].setValue(product.price);
            this.productForm['countInStock'].setValue(product.countInStock);
            this.productForm['isFeatured'].setValue(product.isFeatured);
            this.productForm['description'].setValue(product.description);
            this.productForm['richDescription'].setValue(product.richDescription);
            this.imageDisplay = product.image;
            this.productForm['image'].setValidators([]);
            this.productForm['image'].updateValueAndValidity();
          });
        }
      });
  
    }

    onImageUpload(event:any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      const file = event.target.files[0];
      if (file) {
        this.productsForm.patchValue({ image: file });
        this.productsForm.get('image')?.updateValueAndValidity();
        const fileReader = new FileReader();
        fileReader.onload = () => {
          this.imageDisplay = fileReader.result;
        };
        fileReader.readAsDataURL(file);
      }
    }
}
