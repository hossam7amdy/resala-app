import type IReviewService from './review-service/IReviewService.js';
import ReviewService from './review-service/ReviewService.js';

export * as authService from './auth-service.js';
export * as userService from './user-service.js';
export * as inventoryService from './inventory-service/index.js';
export * as communicationService from './communication-service.js';
export * as shoppingService from './shopping-service.js';
export * as orderService from './order-service.js';
export * as paymentService from './payment-service.js';

export { ReviewService };
export type { IReviewService };
