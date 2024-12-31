import type { ListMediaRequest, ListMediaResponse, Media } from '@resala/shared';

type GetMediaResponseDto = Media;

type ListMediaRequestDto = ListMediaRequest['query'];
type ListMediaResponseDto = ListMediaResponse['data'];

export type { GetMediaResponseDto, ListMediaResponseDto, ListMediaRequestDto };
