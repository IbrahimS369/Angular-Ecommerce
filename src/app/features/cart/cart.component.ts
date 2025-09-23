import { Component, inject, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Cart } from './models/cart.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  cartDetails: Cart = {} as Cart;
  ngOnInit(): void {
    this.getLoggedUserData();
  }

  getLoggedUserData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartService.countNumber.set(res.numOfCartItems);
        this.cartDetails = res.data;
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  removeProduct(id: string): void {
    this.cartService.deleteSpecificProduct(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartService.countNumber.set(res.numOfCartItems);
        this.cartDetails = res.data;
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  clearCart(): void {
    this.cartService.deleteCart().subscribe({
      next: (res) => {
        console.log(res);
        if (res.message === 'success') {
          this.getLoggedUserData();
        }

      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  updateProductCount(id: string, count: number): void {
    this.cartService.updateProductQuantity(id, count).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res.data;
      },
      error: (err) => {
        console.log(err);

      },
    })

  }
}
