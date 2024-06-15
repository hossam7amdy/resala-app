import type { CreateReviewRequest, DefaultRequestQuery, GetReviewResponse } from '@resala/shared';

export type Filters = Required<DefaultRequestQuery['query']>;
export type CreateReviewInput = CreateReviewRequest['body'] & { userId: number };
export type UpdateReviewInput = Omit<CreateReviewInput, 'productId'>;
export type ReviewOutput = GetReviewResponse['data'];
