import { Component, computed, inject, Input, OnInit, PLATFORM_ID, Signal } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly id = inject(PLATFORM_ID);
  count: Signal<number> = computed(() => this.cartService.countNumber());
  @Input({ required: true }) isLogin!: boolean;

  blankPages: { path: string; title: string }[] = [
    { path: '/home', title: 'Home' },
    { path: '/products', title: 'Products' },
    { path: '/wishlist', title: 'Wish List' },
    { path: '/categories', title: 'Categories' },
    { path: '/brands', title: 'Brands' },

  ]

  authPages: { path: string; title: string }[] = [
    { path: '/login', title: 'Login' },
    { path: '/register', title: 'Register' },
  ]




  constructor(private flowbiteService: FlowbiteService) { }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    if (isPlatformBrowser(this.id)) {
      this.getAllCartData();
    }

  }



  getAllCartData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartService.countNumber.set(res.numOfCartItems);
      }
    })
  }

  signOut() {
    this.authService.logOut();
  }
}
