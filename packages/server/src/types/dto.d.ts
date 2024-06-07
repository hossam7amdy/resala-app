import type { CreateReviewRequest, DefaultRequestQuery, GetReviewResponse } from '@resala/shared';

export type Filters = Omit<Required<DefaultRequestQuery['query']>, 'deleted'>;
export type CreateReviewInput = CreateReviewRequest['body'] & { userId: number };
export type UpdateReviewInput = Omit<CreateReviewInput, 'productId'>;
export type ReviewOutput = GetReviewResponse['data'];
