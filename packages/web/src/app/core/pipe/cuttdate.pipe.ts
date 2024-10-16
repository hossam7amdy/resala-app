import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cuttdate',
  standalone: true,
})
export class CuttdatePipe implements PipeTransform {
  transform(createdDate: string): string {
    return createdDate.split('T').slice(0, 1).join(' ');
  }
}
