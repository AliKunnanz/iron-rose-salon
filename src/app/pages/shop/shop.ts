import { Component, OnInit } from '@angular/core';
import { SalonApiService } from '../../services/salon-api.service';
import { Product } from '../../services/models';

@Component({
  selector: 'app-shop',
  imports: [],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop implements OnInit {
  products: Product[] = [];
  loading = true;
  error = '';

  constructor(private api: SalonApiService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.api.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products. Please try again later.';
        this.loading = false;
        console.error('Error loading products:', err);
      }
    });
  }

  getProductsByCategory(): { category: string; products: Product[] }[] {
    const grouped: { [key: string]: Product[] } = {};
    for (const product of this.products) {
      if (!grouped[product.category]) {
        grouped[product.category] = [];
      }
      grouped[product.category].push(product);
    }
    return Object.keys(grouped).map(category => ({
      category,
      products: grouped[category]
    }));
  }
}
