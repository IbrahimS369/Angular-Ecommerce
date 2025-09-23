import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../shared/components/input/input.component";
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  private readonly fb = inject(FormBuilder)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly cartService = inject(CartService)
  private readonly toastrService = inject(ToastrService)
  private readonly router = inject(Router)
  private submittedByButton: string | null = null;

  checkOutForm!: FormGroup;
  id: string | null = null;

  ngOnInit(): void {
    this.initForm();
    this.getCartId();
  }

  setSubmitButton(buttonName: string): void {
    this.submittedByButton = buttonName;
  }

  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.id = urlParams.get('id');

      }
    })
  }

  initForm(): void {
    this.checkOutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, [Validators.required]],
        phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
        city: [null, [Validators.required]],
      })
    })
  }

  supmitForm(): void {
    if (this.checkOutForm.valid) {
      console.log(this.checkOutForm.value);

      if (this.submittedByButton === 'visa') {
        console.log('Form submitted by Visa button');
        // Logic for Payment By Visa
        this.cartService.checkOutSession(this.id, this.checkOutForm.value).subscribe({
          next: (res) => {
            console.log(res);
            if (res.status === 'success') {
              window.open(res.session.url, '_self')
            }

          },
          error: (err) => {
            console.log(err);

          }
        })
      } else if (this.submittedByButton === 'cash') {
        console.log('Form submitted by Cash button');
        // Logic for Payment By Cash
        this.cartService.cashOrder(this.id, this.checkOutForm.value).subscribe({
          next: (res) => {
            console.log(res);
            this.toastrService.success('payment operation will be done on shipping')
            setTimeout(() => { this.router.navigate(['/allorders']) }, 1000)
          },
          error: (err) => {
            console.log(err);

          }
        })
      }
      this.submittedByButton = null; // Reset for next submission


    }
  }
}
