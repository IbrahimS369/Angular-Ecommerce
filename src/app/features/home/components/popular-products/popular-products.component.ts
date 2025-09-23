import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { Product } from '../../../../core/interfaces/products.interface';
import { ProductsService } from '../../../../core/services/products/products.service';

@Component({
  selector: 'app-popular-products',
  imports: [CardComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css',
})
export class PopularProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  productsList: Product[] = [];
  ngOnInit(): void {
    this.getAllProductsData();
  }

  getAllProductsData(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.productsList = res.data;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
