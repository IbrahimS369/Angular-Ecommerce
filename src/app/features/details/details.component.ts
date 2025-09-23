import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from './services/product-details.service';
import { Product } from '../../core/interfaces/products.interface';
import { CartService } from '../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productDetailsService = inject(ProductDetailsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);


  id: string | null = null;
  productDetails: Product = {} as Product;

  ngOnInit(): void {
    this.getProductId();
    this.getProductDetailsData();
  }

  getProductId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.id = urlParams.get('id');

      },
    })
  }

  getProductDetailsData(): void {
    this.productDetailsService.getProductDetails(this.id).subscribe({
      next: (res) => {
        this.productDetails = res.data;
        console.log(res);

      },
      error: (err) => {
        console.log(err);

      },
    })
  }

  addProductItemToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'Fresh Cart');
        }

      },
      error: (err) => {
        console.log(err);

      }
    })
  }
}
