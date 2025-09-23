import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);

  countNumber: WritableSignal<number> = signal(0);


  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'cart', { productId: id })
  }

  updateProductQuantity(productId: string, count: number): Observable<any> {
    return this.httpClient.put(environment.baseUrl + 'cart/' + productId, { count })
  }

  deleteSpecificProduct(productId: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + 'cart/' + productId)
  }

  deleteCart(): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + 'cart')
  }

  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'cart')
  }

  checkOutSession(id: string | null, data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `orders/checkout-session/${id}?url=http://localhost:4200`, data)
  }

  cashOrder(id: string | null, data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `orders/${id}`, data)
  }
}
