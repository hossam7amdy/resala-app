import { Pipe, PipeTransform } from '@angular/core';

import { Product } from '../interfaces/product';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  lang = localStorage.getItem('language');
  transform(products: Product[], searchString: string): Product[] {
    return products.filter(
      this.lang == 'ar'
        ? item =>
            item.arName.includes(searchString) ||
            item.enName.toLowerCase().includes(searchString.toLowerCase())
        : item =>
            item.enName.toLowerCase().includes(searchString.toLowerCase()) ||
            item.arName.includes(searchString)
    );
  }
}
