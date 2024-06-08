import type IReviewService from './review-service/IReviewService.js';
import ReviewService from './review-service/ReviewService.js';

export * as authService from './auth-service/auth-service.js';
export * as userService from './user-service/user-service.js';
export * as inventoryService from './inventory-service/index.js';
export * as communicationService from './communication-service/communication-service.js';
export * as shoppingService from './shopping-service/shopping-service.js';
export * as orderService from './order-service/order-service.js';
export * as paymentService from './payment-service/payment-service.js';
export * from './file-service/index.js';
export * from './file-storage-service/index.js';

export { ReviewService };
export type { IReviewService };
