import type {
  ListMediaRequest,
  ListMediaResponse,
  Media,
  SetMediaMetadataSchema,
} from '@resala/shared';
import type { z } from 'zod';

type MediaDto = Media;

type SetMediaMetadataRequestDto = z.infer<typeof SetMediaMetadataSchema.shape.body>;

type GetMediaResponseDto = ListMediaResponse['data'][0];

type ListMediaRequestDto = ListMediaRequest['query'];
type ListMediaResponseDto = ListMediaResponse['data'];

export type {
  MediaDto,
  SetMediaMetadataRequestDto,
  GetMediaResponseDto,
  ListMediaResponseDto,
  ListMediaRequestDto,
};
