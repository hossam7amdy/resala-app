import {
  type CreateReviewRequest,
  type CreateReviewResponse,
  CreateReviewSchema,
  type DeleteReviewRequest,
  type DeleteReviewResponse,
  DeleteReviewSchema,
  type GetReviewResponse,
  GetReviewSchema,
  type ListReviewsRequest,
  type ListReviewsResponse,
  ListReviewsSchema,
  type UpdateReviewRequest,
  type UpdateReviewResponse,
  UpdateReviewSchema,
} from '@resala/shared';
import {
  Body,
  Controller,
  Delete,
  Get,
  Middlewares,
  Path,
  Post,
  Put,
  Queries,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from 'tsoa/dist/index.js';

import { db } from '../../datastore/index.js';
import { authorizeAccess } from '../../middlewares/authorization.js';
import { validateMiddleware } from '../../middlewares/validateMiddleware.js';
import { ReviewService } from './review.service.js';

@Tags('Review')
@Route('api/v1/reviews')
@Security('jwt_auth')
@Middlewares([authorizeAccess])
export class ReviewController extends Controller {
  private readonly reviewService: ReviewService;

  constructor() {
    super();
    this.reviewService = new ReviewService(db);
  }

  @Post()
  @SuccessResponse('201', 'Review created')
  @Middlewares([validateMiddleware(CreateReviewSchema)])
  public async createReview(
    @Body() body: CreateReviewRequest['body']
  ): Promise<CreateReviewResponse> {
    const review = await this.reviewService.create(body);

    return { success: true, data: review };
  }

  @Put('{reviewId}')
  @Middlewares([validateMiddleware(UpdateReviewSchema)])
  public async updateReview(
    @Path() reviewId: string,
    @Body() body: UpdateReviewRequest['body']
  ): Promise<UpdateReviewResponse> {
    const review = await this.reviewService.update(+reviewId, body);

    return { success: true, data: review };
  }

  @Delete('{reviewId}')
  @Middlewares([validateMiddleware(DeleteReviewSchema)])
  public async deleteReview(
    @Path() reviewId: string,
    @Queries() query: DeleteReviewRequest['query']
  ): Promise<DeleteReviewResponse> {
    const address = await this.reviewService.delete(+reviewId, query.userId);

    return { success: true, data: address };
  }

  @Get('{reviewId}')
  @Middlewares([validateMiddleware(GetReviewSchema)])
  public async getReview(@Path() reviewId: string): Promise<GetReviewResponse> {
    const review = await this.reviewService.find(+reviewId);

    return { success: true, data: review };
  }

  @Get()
  @Middlewares([validateMiddleware(ListReviewsSchema)])
  public async listReviews(
    @Queries() query: ListReviewsRequest['query']
  ): Promise<ListReviewsResponse> {
    const { reviews, pagination } = await this.reviewService.list(query);

    return {
      success: true,
      data: { reviews, pagination },
    };
  }
}
