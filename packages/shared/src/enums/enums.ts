export enum Role {
  USER = 'user',
  ADMIN = 'admin',
  STAFF = 'staff',
}

export enum MarketingState {
  SUBSCRIBED = 'subscribed',
  NOT_SUBSCRIBED = 'not_subscribed',
  UNSUBSCRIBED = 'unsubscribed',
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
