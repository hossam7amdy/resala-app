export interface Stock {
  color: StockColor;
  size: StockSize;
  quantity: number;
}

export interface StockColor {
  id: number;
  code: string;
  enName: string;
}

export interface StockSize {
  id: number;
  name: string;
}
