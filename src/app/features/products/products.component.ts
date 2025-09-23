import { Component, inject } from '@angular/core';
import { CardComponent } from "../../shared/components/card/card.component";
import { Product } from '../../core/interfaces/products.interface';
import { ProductsService } from '../../core/services/products/products.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products',
  imports: [CardComponent, NgxPaginationModule, SearchPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  private readonly productsService = inject(ProductsService);
  private readonly ngxSpinnerService = inject(NgxSpinnerService);
  productsList: Product[] = [];
  text: string = '';
  pageSize!: number;
  p!: number;
  total!: number;

  ngOnInit(): void {
    this.getAllProductsData();
  }

  getAllProductsData(pageNumber: number = 1): void {

    this.productsService.getAllProducts(pageNumber).subscribe({
      next: (res) => {
        this.productsList = res.data;
        this.pageSize = res.metadata.limit;
        this.p = res.metadata.currentPage;
        this.total = res.results;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
