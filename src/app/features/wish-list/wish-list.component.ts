import { Component, inject, OnInit } from '@angular/core';
import { WishListService } from '../cart/services/wish-list.service';
import { Product } from '../../core/interfaces/products.interface';
import { CartService } from '../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wish-list',
  imports: [],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent implements OnInit {
  private readonly wishListService = inject(WishListService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  wishDetailsList: Product[] = [];
  wishDetails!: any;


  ngOnInit(): void {
    this.getLoggedUserWishlistData();
  }

  getLoggedUserWishlistData(): void {
    this.wishListService.getLoggedUserWishList().subscribe({
      next: (res) => {
        console.log(res);
        this.wishDetails = res;
        this.wishDetailsList = res.data;

      }
    })
  }

  removeProduct(productId: string): void {
    this.wishListService.removeProductFromWishlist(productId).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.getLoggedUserWishlistData();
        }
      }
    })
  }

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

}
