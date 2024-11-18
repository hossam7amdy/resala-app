import {
  type CreateReviewRequest,
  type CreateReviewResponse,
  CreateReviewSchema,
  type DeleteReviewRequest,
  type DeleteReviewResponse,
  DeleteReviewSchema,
  type GetReviewResponse,
  GetReviewSchema,
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
  Query,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from 'tsoa/dist/index.js';

import { db } from '../../datastore/index.js';
import { authorization } from '../../middlewares/authorization.js';
import { validate } from '../../middlewares/validateHandler.js';
import { ReviewService } from './review.service.js';

@Tags('Review')
@Route('api/v1/reviews')
@Middlewares([authorization])
export class ReviewController extends Controller {
  private readonly reviewService: ReviewService;

  constructor() {
    super();
    this.reviewService = new ReviewService(db);
  }

  @Post()
  @Security('jwt_auth')
  @SuccessResponse('201', 'Review created')
  @Middlewares([validate(CreateReviewSchema)])
  public async createReview(
    @Body() body: CreateReviewRequest['body']
  ): Promise<CreateReviewResponse> {
    const review = await this.reviewService.create(body);

    return { success: true, data: review };
  }

  @Put('{reviewId}')
  @Security('jwt_auth')
  @Middlewares([validate(UpdateReviewSchema)])
  public async updateReview(
    @Path() reviewId: string,
    @Body() body: UpdateReviewRequest['body']
  ): Promise<UpdateReviewResponse> {
    const review = await this.reviewService.update(+reviewId, body);

    return { success: true, data: review };
  }

  @Delete('{reviewId}')
  @Security('jwt_auth')
  @Middlewares([validate(DeleteReviewSchema)])
  public async deleteReview(
    @Path() reviewId: string,
    @Queries() query: DeleteReviewRequest['query']
  ): Promise<DeleteReviewResponse> {
    const address = await this.reviewService.delete(+reviewId, query.userId);

    return { success: true, data: address };
  }

  @Get('{reviewId}')
  @Middlewares([validate(GetReviewSchema)])
  public async getReview(@Path() reviewId: string): Promise<GetReviewResponse> {
    const review = await this.reviewService.find(+reviewId);

    return { success: true, data: review };
  }

  @Get()
  @Middlewares([validate(ListReviewsSchema)])
  public async listReviews(
    @Query() page: number = 1,
    @Query() limit: number = 10,
    @Query() productId: number
  ): Promise<ListReviewsResponse> {
    const { reviews, pagination } = await this.reviewService.list({
      page,
      limit,
      productId: +productId,
    });

    return {
      success: true,
      data: { reviews, pagination },
    };
  }
}
