import type {
  CreateReviewRequest,
  CreateReviewResponse,
  DeleteReviewRequest,
  DeleteReviewResponse,
  GetReviewRequest,
  GetReviewResponse,
  ListReviewsRequest,
  ListReviewsResponse,
  UpdateReviewRequest,
  UpdateReviewResponse,
} from '@resala/shared';

import type { ExpressHandler, ExpressHandlerWithParams, LocalUser } from '../../types/express.js';

export interface CreateReview
  extends ExpressHandler<CreateReviewRequest['body'], CreateReviewResponse, undefined, LocalUser> {}

export interface UpdateReview
  extends ExpressHandlerWithParams<
    UpdateReviewRequest['params'],
    UpdateReviewRequest['body'],
    UpdateReviewResponse,
    undefined,
    LocalUser
  > {}

export interface DeleteReview
  extends ExpressHandlerWithParams<
    DeleteReviewRequest['params'],
    undefined,
    DeleteReviewResponse,
    undefined,
    LocalUser
  > {}

export interface GetReview
  extends ExpressHandlerWithParams<GetReviewRequest['params'], undefined, GetReviewResponse> {}

export interface ListReviews
  extends ExpressHandler<undefined, ListReviewsResponse, ListReviewsRequest['query']> {}

export interface IReviewController {
  createReview: CreateReview;
  updateReview: UpdateReview;
  deleteReview: DeleteReview;
  getReview: GetReview;
  listReviews: ListReviews;
}
