import type { ReviewService } from '../../services/index.js';
import type {
  CreateReview,
  DeleteReview,
  GetReview,
  ListProductReviews,
  ListReviews,
  UpdateReview,
} from './IReviewController.js';

export default class ReviewController {
  private readonly reviewService: ReviewService;

  constructor(reviewService: ReviewService) {
    this.reviewService = reviewService;
  }

  createReview: CreateReview = async (req, res, next) => {
    try {
      const review = await this.reviewService.createReview({
        ...req.body,
        userId: res.locals.user.id,
      });

      res.status(201).json({ success: true, data: review });
    } catch (e) {
      next(e);
    }
  };

  updateReview: UpdateReview = async (req, res, next) => {
    try {
      const review = await this.reviewService.updateReview(req.params.reviewId, {
        ...req.body,
        userId: res.locals.user.id,
      });

      res.json({ success: true, data: review });
    } catch (e) {
      next(e);
    }
  };

  deleteReview: DeleteReview = async (req, res, next) => {
    try {
      const address = await this.reviewService.deleteReview(
        req.params.reviewId,
        res.locals.user.id
      );

      res.json({ success: true, data: address });
    } catch (e) {
      next(e);
    }
  };

  getReview: GetReview = async (req, res, next) => {
    try {
      const review = await this.reviewService.getReviewById(req.params.reviewId);

      res.json({ success: true, data: review });
    } catch (e) {
      next(e);
    }
  };

  listReviews: ListReviews = async (req, res, next) => {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;

      const { reviews, pagination } = await this.reviewService.listReviews({
        page,
        limit,
        query: req.query.query || '',
      });

      res.json({
        success: true,
        data: { reviews, pagination },
      });
    } catch (e) {
      next(e);
    }
  };

  listProductReviews: ListProductReviews = async (req, res, next) => {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;

      const { reviews, pagination } = await this.reviewService.listProductReviews(
        req.params.productId,
        { page, limit }
      );

      res.json({
        success: true,
        data: { reviews, pagination },
      });
    } catch (e) {
      next(e);
    }
  };
}
