import type { RequiredMedia } from '@/features/media';
import type { Color, GetProductResponse, Size } from '@resala/shared';

export interface StockItem {
  color: string;
  medias: RequiredMedia[];
  sizes: {
    size: string;
    quantity: number;
  }[];
}

export interface StockFormValues {
  variants: StockItem[];
}

export interface StockEditorProps {
  sizes: Size[];
  colors: Color[];
  medias: RequiredMedia[];
  productDetails: GetProductResponse['data'];
}

export interface StockFormItemsProps extends Pick<StockEditorProps, 'sizes' | 'colors' | 'medias'> {
  variants?: StockItem[];
}
