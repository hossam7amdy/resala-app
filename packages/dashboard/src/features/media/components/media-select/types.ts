import type { Media } from '@resala/shared';

export type RequiredMedia = Pick<Media, 'id' | 'url'> & Partial<Media>;
