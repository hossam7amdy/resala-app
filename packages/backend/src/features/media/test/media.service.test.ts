import type { CDNPort, CloudStoragePort } from '@/interfaces';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { MediaService } from '../media.service';

describe('MediaService', () => {
  let mediaService: MediaService;
  let cdn: CDNPort;
  let storage: CloudStoragePort;

  beforeEach(() => {
    cdn = {
      generateUrl: vi.fn(),
    } as unknown as CDNPort;

    storage = {
      generatePresignedUrl: vi.fn(),
      blobExists: vi.fn(),
      getPublicUrl: vi.fn(),
      deleteBlob: vi.fn(),
      getBlobMetadata: vi.fn(),
      listBlobs: vi.fn(),
    } as unknown as CloudStoragePort;

    mediaService = new MediaService(storage, cdn);
  });

  it('should generate upload URL', async () => {
    const id = 'test-id';
    const url = 'http://example.com/upload';
    vi.spyOn(storage, 'generatePresignedUrl').mockResolvedValue(url);

    const result = await mediaService.getUploadUrl(id);

    expect(result).toBe(url);
    expect(storage.generatePresignedUrl).toHaveBeenCalledWith(id, 60);
  });

  it('should delete media', async () => {
    const id = 'test-id';
    vi.spyOn(storage, 'deleteBlob').mockResolvedValue(true);

    const result = await mediaService.delete(id);

    expect(result).toEqual(undefined);
    expect(storage.deleteBlob).toHaveBeenCalledWith(id);
  });

  it('should get media by id', async () => {
    const id = 'Test Title';
    const date = new Date().toISOString();
    const media = {
      id,
      filename: 'Test Title',
      size: 1000,
      mimetype: 'image/jpeg',
      updatedAt: date,
    };
    vi.spyOn(storage, 'getBlobMetadata').mockResolvedValue({
      key: 'Test Title',
      size: 1000,
      contentType: 'image/jpeg',
      lastModified: date,
    });

    const result = await mediaService.getMedia(id);

    expect(result).toEqual(media);
  });

  it('should list media', async () => {
    const date = new Date().toISOString();
    const request = { search: 'test' };
    const medias = [
      { id: 'test-id', filename: 'test-id', size: 1000, mimetype: 'image/jpeg', updatedAt: date },
    ];
    vi.spyOn(storage, 'listBlobs').mockResolvedValue([
      { key: 'test-id', size: 1000, contentType: 'image/jpeg', lastModified: date },
    ]);

    const result = await mediaService.listMedia(request);

    expect(result).toEqual(medias);
  });
});
