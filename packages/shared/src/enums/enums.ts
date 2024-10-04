export enum Role {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  MODERATOR = 'MODERATOR',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  FULFILLED = 'FULFILLED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentStatus {
  UNPAID = 'UNPAID',
  PAID = 'PAID',
  FAILED = 'FAILED',
  VOIDED = 'VOIDED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
}

export enum DiscountEnum {
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED',
  BOGO = 'BOGO',
  BULK = 'BULK',
}
