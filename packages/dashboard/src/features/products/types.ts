import type { Media } from '@resala/shared';

import type { StockFormValues } from '../stocks';

interface ProductFormValues extends StockFormValues {
  image: Pick<Media, 'id' | 'url'>;
  categoryId: string;
  enName: string;
  arName: string;
  enDescription: string;
  arDescription: string;
  price: number;
}

export type { ProductFormValues };
