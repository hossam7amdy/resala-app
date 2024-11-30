export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
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

export enum MarketingState {
  SUBSCRIBED = 'SUBSCRIBED',
  NOT_SUBSCRIBED = 'NOT_SUBSCRIBED',
  UNSUBSCRIBED = 'UNSUBSCRIBED',
}
