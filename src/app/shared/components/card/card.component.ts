import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { Product } from '../../../core/interfaces/products.interface';
import { RouterLink } from '@angular/router';
import { TermPipe } from '../../pipes/term-pipe';
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../../features/cart/services/wish-list.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [RouterLink, TermPipe, CurrencyPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input({ required: true }) product: Product = {} as Product;
  private readonly cartService = inject(CartService);
  private readonly wishListService = inject(WishListService);
  private readonly toastrService = inject(ToastrService);
  liked: boolean = false;

  addProductItemToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartService.countNumber.set(res.numOfCartItems);
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'Fresh Cart');
        }
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  addProductItemToWishlist(productId: string): void {
    this.wishListService.addProductToWishlist(productId).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.liked = true;
          this.toastrService.success(res.message, 'Fresh Cart');
        }
      },
      error: (err) => {
        console.log(err);

      }
    })
  }
}
