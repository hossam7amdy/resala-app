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

      res.status(201).json({
        success: true,
        data: review,
      });
    } catch (e) {
      next(e);
    }
  };

  updateReview: UpdateReview = async (req, res, next) => {
    try {
      console.log(res.locals.user);

      const review = await this.reviewService.updateReview(req.params.reviewId, {
        userId: res.locals.user.id,
        rating: req.body.rating,
        comment: req.body.comment,
      });

      res.json({
        success: true,
        data: review,
      });
    } catch (e) {
      next(e);
    }
  };

  deleteReview: DeleteReview = async (req, res, next) => {
    try {
      await this.reviewService.deleteReview(req.params.reviewId, res.locals.user.id);

      res.json({
        success: true,
      });
    } catch (e) {
      next(e);
    }
  };

  getReview: GetReview = async (req, res, next) => {
    try {
      const review = await this.reviewService.getReviewById(req.params.reviewId);

      res.json({
        success: true,
        data: review,
      });
    } catch (e) {
      next(e);
    }
  };

  listReviews: ListReviews = async (req, res, next) => {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;

      const { reviews, count } = await this.reviewService.listAndCountReviews({
        page,
        limit,
        query: req.query.query || '',
      });

      res.json({
        success: true,
        data: {
          reviews,
          pagination: {
            page,
            limit,
            total: count,
          },
        },
      });
    } catch (e) {
      next(e);
    }
  };

  listProductReviews: ListProductReviews = async (req, res, next) => {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;

      const { reviews, count } = await this.reviewService.listAndCountProductReviews(
        req.params.productId,
        {
          page,
          limit,
          query: req.query.query || '',
        }
      );

      res.json({
        success: true,
        data: {
          reviews,
          pagination: {
            page,
            limit,
            total: count,
          },
        },
      });
    } catch (e) {
      next(e);
    }
  };
}
