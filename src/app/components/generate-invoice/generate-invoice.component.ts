import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroCustomModule } from 'src/app/shared/ng-zorro-custom.module';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-generate-invoice',
  standalone: true,
  imports: [
    CommonModule,
    NgZorroCustomModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './generate-invoice.component.html',
  styleUrls: ['./generate-invoice.component.scss'],
})
export class GenerateInvoiceComponent implements OnInit {
  @Output() readonly actionEmitter: EventEmitter<object> = new EventEmitter();
  products: any[] = [
    {
      name: 'Sugar',
      category: 'Grocery',
      unit: 'kg',
      unit_price: 130,
      stock_quantity: 50,
      supplier: 'ABC Suppliers',
      expiry_date: null,
      barcode: '1234567890123',
    },
    {
      name: 'Milk',
      category: 'Dairy',
      unit: 'liter',
      unit_price: 80,
      stock_quantity: 100,
      supplier: 'Fresh Dairy Co.',
      expiry_date: '2025-03-10',
      barcode: '9876543210987',
    },
    {
      name: 'Rice',
      category: 'Grocery',
      unit: 'kg',
      unit_price: 60,
      stock_quantity: 200,
      supplier: 'XYZ Agro',
      expiry_date: null,
      barcode: '1111222233334',
    },
    {
      name: 'Eggs',
      category: 'Poultry',
      unit: 'dozen',
      unit_price: 150,
      stock_quantity: 30,
      supplier: 'Farm Fresh',
      expiry_date: '2025-02-28',
      barcode: '4444555566667',
    },
    {
      name: 'Cooking Oil',
      category: 'Grocery',
      unit: 'liter',
      unit_price: 180,
      stock_quantity: 75,
      supplier: 'Healthy Oils Ltd.',
      expiry_date: '2025-06-15',
      barcode: '5555666677778',
    },
  ];

  productForm!: FormGroup;
  form!: FormGroup;
  filteredProducts: any[] = [];

  constructor(
    private _fb: FormBuilder,
    private _notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.productForm = this.createProductForm();
    this.form = this.createForm();

    this.productForm.controls['product_id'].valueChanges.subscribe(() => {
      const currentProductId = this.productForm.controls['product_id'].value;
      if (currentProductId) {
        const selectedProduct = this.products.find(
          (product) => product.barcode === currentProductId
        );
        console.log(selectedProduct);
        if (selectedProduct) {
          this.productForm.controls['product_name'].setValue(
            selectedProduct.name
          );
          this.productForm.controls['unit_price'].setValue(
            selectedProduct.unit_price
          );
          this.productForm.controls['total_price'].setValue(
            selectedProduct.unit_price *
              this.productForm.controls['quantity'].value
          );
        }
      } else {
        this.productForm.controls['product_name'].setValue(null);
        this.productForm.controls['unit_price'].setValue(null);
        this.productForm.controls['total_price'].setValue(null);
      }
    });

    this.productForm.controls['quantity'].valueChanges.subscribe(() => {
      const currentQuantity = this.productForm.controls['quantity'].value;
      const currentProductId = this.productForm.controls['product_id'].value;
      if (currentQuantity && currentProductId) {
        this.productForm.controls['total_price'].setValue(
          this.productForm.controls['unit_price'].value * currentQuantity
        );
      } else {
        this.productForm.controls['total_price'].setValue(null);
      }
    });
  }

  createForm(): FormGroup {
    return this._fb.group({
      invoice_number: [this.generateInvoiceNumber(), [Validators.required]],
      date: [new Date(), [Validators.required]],
      total_bill: [null, [Validators.required]],
      items: this._fb.array([]),
    });
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  createProductForm(): FormGroup {
    return this._fb.group({
      product_id: [null, [Validators.required]],
      product_name: [null, [Validators.required]],
      quantity: [1, [Validators.required]],
      unit_price: [null, [Validators.required]],
      total_price: [null, [Validators.required]],
    });
  }

  handleConfirm(): any {
    if (this.productForm.valid) {
      const productData = this.productForm.getRawValue();

      this.items.push(this._fb.group(productData));
      // Update the total_bill
      this.updateTotalBill();

      this.productForm.reset({
        product_id: null,
        quantity: 1,
        unit_price: null,
        total_price: null,
      });
    } else {
      this._notificationService.warning(
        'Warning!',
        'Please enter a valid product'
      );
    }
  }

  updateTotalBill(): void {
    const totalAmount = this.items.controls.reduce((sum, item) => {
      return sum + (item.value.total_price || 0);
    }, 0);

    this.form.patchValue({ total_bill: totalAmount });
  }

  generateInvoiceNumber(): string {
    return `INV-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
  }

  increaseQuantity() {
    this.productForm.controls['quantity'].setValue(
      this.productForm.controls['quantity'].value + 1
    );
  }

  decreaseQuantity() {
    if (this.productForm.controls['quantity'].value > 1) {
      this.productForm.controls['quantity'].setValue(
        this.productForm.controls['quantity'].value - 1
      );
    }
  }

  handleSubmit(): void {
    if (this.form.valid) {
      this.actionEmitter.emit({
        action: 'purchase',
        value: this.form.getRawValue(),
      });

      const invoice_number = this.generateInvoiceNumber();
      const date = new Date();

      this.form.reset({
        invoice_number,
        date,
        total_bill: null,
        items: [],
      });

      this.productForm.reset({
        product_id: null,
        product_name: null,
        quantity: 1,
        unit_price: null,
        total_price: null,
      });

      this._notificationService.success(
        'Success!',
        'Sales entry submitted successfully.'
      );
    } else {
      this._notificationService.warning(
        'Warning!',
        'Please fill in all required fields.'
      );
    }
  }
}
