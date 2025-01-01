import { NotFoundError } from '@/exceptions';
import type { CDNPort, CloudStoragePort } from '@/interfaces';

import type { GetMediaResponseDto, ListMediaRequestDto, ListMediaResponseDto } from './media.dto';

class MediaService {
  constructor(
    private storage: CloudStoragePort,
    private cdn: CDNPort
  ) {}

  async getUploadUrl(id: string): Promise<string> {
    return this.storage.generatePresignedUrl(id, 60);
  }

  async delete(id: string): Promise<void> {
    await this.storage.deleteBlob(id);
  }

  async getMedia(id: string): Promise<GetMediaResponseDto> {
    const media = await this.storage.getBlobMetadata(id);

    if (!media) {
      throw new NotFoundError('Media not found');
    }

    return {
      id: media.key,
      url: this.cdn.generateUrl(media.key),
      size: media.size,
      filename: media.key,
      mimetype: media.contentType,
      updatedAt: media.lastModified,
    };
  }

  async listMedia({ search }: ListMediaRequestDto): Promise<ListMediaResponseDto> {
    const medias = await this.storage.listBlobs(search);

    const sortedDesc = medias.sort((a, b) => {
      const dateA = new Date(a.lastModified).getTime();
      const dateB = new Date(b.lastModified).getTime();
      return dateB - dateA;
    });

    return sortedDesc.map(media => ({
      id: media.key,
      url: this.cdn.generateUrl(media.key),
      size: media.size,
      filename: media.key,
      mimetype: media.contentType,
      updatedAt: media.lastModified,
    }));
  }
}

export { MediaService };
