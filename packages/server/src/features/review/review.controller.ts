import type {
  CreateReview,
  DeleteReview,
  GetReview,
  IReviewController,
  ListReviews,
  UpdateReview,
} from './review.controller.interface.js';
import type { ReviewService } from './review.service.js';

export class ReviewController implements IReviewController {
  private readonly reviewService: ReviewService;

  constructor(reviewService: ReviewService) {
    this.reviewService = reviewService;
  }

  createReview: CreateReview = async (req, res, next) => {
    try {
      const review = await this.reviewService.create({
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
      const review = await this.reviewService.update(req.params.reviewId, {
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
      const address = await this.reviewService.delete(req.params.reviewId, res.locals.user.id);

      res.json({ success: true, data: address });
    } catch (e) {
      next(e);
    }
  };

  getReview: GetReview = async (req, res, next) => {
    try {
      const review = await this.reviewService.find(req.params.reviewId);

      res.json({ success: true, data: review });
    } catch (e) {
      next(e);
    }
  };

  listReviews: ListReviews = async (req, res, next) => {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;

      const { reviews, pagination } = await this.reviewService.list({
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
}
