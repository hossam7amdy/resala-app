import { NotFoundError } from '@/exceptions';
import type { Datastore } from '@/infrastructure/data-store';
import type { CloudStorage } from '@/interfaces';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { MediaService } from '../media.service';

describe('MediaService', () => {
  let mediaService: MediaService;
  let db: Datastore;
  let storage: CloudStorage;

  beforeEach(() => {
    db = {
      media: {
        upsert: vi.fn(),
        delete: vi.fn(),
        findUniqueOrThrow: vi.fn(),
        findMany: vi.fn(),
        count: vi.fn(),
      },
    } as unknown as Datastore;

    storage = {
      generatePresignedUrl: vi.fn(),
      blobExists: vi.fn(),
      getPublicUrl: vi.fn(),
      deleteBlob: vi.fn(),
    } as unknown as CloudStorage;

    mediaService = new MediaService(db, storage);
  });

  it('should generate upload URL', async () => {
    const id = 'test-id';
    const url = 'http://example.com/upload';
    vi.spyOn(storage, 'generatePresignedUrl').mockResolvedValue(url);

    const result = await mediaService.getUploadUrl(id);

    expect(result).toBe(url);
    expect(storage.generatePresignedUrl).toHaveBeenCalledWith(id, 60);
  });

  it('should set metadata', async () => {
    const id = 'test-id';
    const data = { title: 'Test Title' };
    const media = { ...data, url: 'http://example.com/media' };
    vi.spyOn(storage, 'blobExists').mockResolvedValue(true);
    vi.spyOn(storage, 'getPublicUrl').mockReturnValue(media.url);
    vi.spyOn(db.media, 'upsert').mockResolvedValue(media);

    const result = await mediaService.setMetadata(id, data);

    expect(result).toEqual(media);
    expect(storage.blobExists).toHaveBeenCalledWith(id);
    expect(storage.getPublicUrl).toHaveBeenCalledWith(id);
    expect(db.media.upsert).toHaveBeenCalledWith({
      update: media,
      create: media,
      where: { id },
    });
  });

  it('should throw NotFoundError if media does not exist when setting metadata', async () => {
    const id = 'test-id';
    const data = { title: 'Test Title' };
    vi.spyOn(storage, 'blobExists').mockResolvedValue(false);

    await expect(mediaService.setMetadata(id, data)).rejects.toThrow(NotFoundError);
    expect(storage.blobExists).toHaveBeenCalledWith(id);
  });

  it('should delete media', async () => {
    const id = 'test-id';
    const media = { id, title: 'Test Title' };
    vi.spyOn(db.media, 'delete').mockResolvedValue(media);
    vi.spyOn(storage, 'deleteBlob').mockResolvedValue(undefined);

    const result = await mediaService.delete(id);

    expect(result).toEqual(media);
    expect(db.media.delete).toHaveBeenCalledWith({ where: { id } });
    expect(storage.deleteBlob).toHaveBeenCalledWith(id);
  });

  it('should get media by id', async () => {
    const id = 'test-id';
    const media = { id, title: 'Test Title' };
    vi.spyOn(db.media, 'findUniqueOrThrow').mockResolvedValue(media);

    const result = await mediaService.getMedia(id);

    expect(result).toEqual(media);
    expect(db.media.findUniqueOrThrow).toHaveBeenCalledWith({ where: { id } });
  });

  it('should list media', async () => {
    const request = { sortBy: 'title', sortOrder: 'asc', search: 'test', page: 1, limit: 10 };
    const medias = [{ id: 'test-id', title: 'Test Title' }];
    vi.spyOn(db.media, 'findMany').mockResolvedValue(medias);

    const result = await mediaService.listMedia(request);

    expect(result).toEqual(medias);
    expect(db.media.findMany).toHaveBeenCalledWith({
      orderBy: { [`${request.sortBy}`]: request.sortOrder },
      where: { filename: { contains: request.search } },
      skip: (request.page - 1) * request.limit,
      take: request.limit,
    });
  });

  it('should count media', async () => {
    const count = 5;
    vi.spyOn(db.media, 'count').mockResolvedValue(count);

    const result = await mediaService.count();

    expect(result).toBe(count);
    expect(db.media.count).toHaveBeenCalled();
  });
});
