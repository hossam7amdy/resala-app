import { Pipe, PipeTransform } from '@angular/core';

import { Product } from '../interfaces/product';

@Pipe({
  name: 'customefillter',
  standalone: true,
})
export class CustomefillterPipe implements PipeTransform {
  transform(products: Product[]): Product[] {
    return products.filter(item => item.discounts.length > 0);
  }

  // return products.filter(item => item.discounts.filter(x => x.type == customeFilter) );
}
