import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layouts/blank-layout/blank-layout.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { CartComponent } from './features/cart/cart.component';
import { ProductsComponent } from './features/products/products.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { BrandsComponent } from './features/brands/brands.component';
import { DetailsComponent } from './features/details/details.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { authGuard } from './core/guards/auth-guard';
import { isLoggedGuard } from './core/guards/is-logged-guard';
import { AllOrdersComponent } from './features/all-orders/all-orders.component';
import { ForgotPasswordComponent } from './core/auth/forgot-password/forgot-password.component';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    {
        path: "", component: AuthLayoutComponent, canActivate: [isLoggedGuard], children: [
            { path: "login", component: LoginComponent, title: "Login Page" },
            { path: "register", component: RegisterComponent, title: "Register Page" },
            { path: "forgot", loadComponent: () => import('./core/auth/forgot-password/forgot-password.component').then((c) => c.ForgotPasswordComponent), title: "Forgot Password Page" },
        ]
    },
    {
        path: "", component: BlankLayoutComponent, canActivate: [authGuard], children: [
            { path: "home", loadComponent: () => import('./features/home/home.component').then((c) => c.HomeComponent), title: "Home Page" },
            { path: "cart", loadComponent: () => import('./features/cart/cart.component').then((c) => c.CartComponent), title: "CartComponent Page" },
            { path: "products", loadComponent: () => import('./features/products/products.component').then((c) => c.ProductsComponent), title: "Products Page" },
            { path: "categories", loadComponent: () => import('./features/categories/categories.component').then((c) => c.CategoriesComponent), title: "Categories Page" },
            { path: "wishlist", loadComponent: () => import('./features/wish-list/wish-list.component').then((c) => c.WishListComponent), title: "Categories Page" },
            { path: "allorders", loadComponent: () => import('./features/all-orders/all-orders.component').then((c) => c.AllOrdersComponent), title: "All Orders Page" },
            { path: "brands", loadComponent: () => import('./features/brands/brands.component').then((c) => c.BrandsComponent), title: "Brands Page" },
            { path: "details/:slug/:id", loadComponent: () => import('./features/details/details.component').then((c) => c.DetailsComponent),data: { renderMode: 'ssr' }, title: "Details Page" },
            { path: "details/:id", loadComponent: () => import('./features/details/details.component').then((c) => c.DetailsComponent),data: { renderMode: 'ssr' }, title: "Details Page" },
            { path: "checkout/:id", loadComponent: () => import('./features/checkout/checkout.component').then((c) => c.CheckoutComponent),data: { renderMode: 'ssr' }, title: "Checkout Page" },
        ]
    },
    {
        path: "**", component: NotfoundComponent, title: "NotFound Page"
    },
];
