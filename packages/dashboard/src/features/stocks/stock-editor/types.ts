import type { Color, GetProductResponse, Media, Size } from '@resala/shared';

export interface StockItem {
  color: string;
  images: Pick<Media, 'id' | 'url'>[];
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
  images: Pick<Media, 'id' | 'url'>[];
  productDetails: GetProductResponse['data'];
}

export interface StockFormItemsProps extends Pick<StockEditorProps, 'sizes' | 'colors' | 'images'> {
  variants: StockItem[];
}
