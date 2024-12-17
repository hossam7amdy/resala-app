import { NotFoundError } from '@/exceptions';
import type { Datastore } from '@/infrastructure/data-store';
import type { CloudStorage } from '@/interfaces';

import type {
  GetMediaResponseDto,
  ListMediaRequestDto,
  ListMediaResponseDto,
  MediaDto,
  SetMediaMetadataRequestDto,
} from './media.dto';

class MediaService {
  constructor(
    private db: Datastore,
    private storage: CloudStorage
  ) {}

  async getUploadUrl(id: string): Promise<string> {
    return this.storage.generatePresignedUrl(id, 60);
  }

  async setMetadata(id: string, data: SetMediaMetadataRequestDto): Promise<MediaDto> {
    const mediaExist = await this.storage.blobExists(id);

    if (!mediaExist) {
      throw new NotFoundError('Media not found');
    }

    const media = {
      ...data,
      url: this.storage.getPublicUrl(id),
    };

    return this.db.media.upsert({
      update: media,
      create: media,
      where: { id },
    });
  }

  async delete(id: string): Promise<MediaDto> {
    const [data] = await Promise.all([
      this.db.media.delete({ where: { id } }),
      this.storage.deleteBlob(id),
    ]);

    return data;
  }

  async getMedia(id: string): Promise<GetMediaResponseDto> {
    const media = await this.db.media.findUniqueOrThrow({
      where: { id },
    });

    return media;
  }

  async listMedia(_?: ListMediaRequestDto): Promise<ListMediaResponseDto> {
    const medias = await this.db.media.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return medias;
  }

  async count(): Promise<number> {
    return this.db.media.count();
  }
}

export { MediaService };
