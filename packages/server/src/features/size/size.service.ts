import type {
  CreateSizeRequest,
  CreateSizeResponse,
  GetSizeResponse,
  ListSizesResponse,
  UpdateSizeRequest,
  UpdateSizeResponse,
} from '@resala/shared';

import type { DataStore } from '../../datastore/index.js';

export class SizeService {
  constructor(private readonly db: DataStore) {}

  async find(id: number): Promise<GetSizeResponse['data']> {
    return await this.db.size.findFirstOrThrow({ where: { id } });
  }

  async list(): Promise<ListSizesResponse['data']> {
    return await this.db.size.findMany();
  }

  async create(size: CreateSizeRequest['body']): Promise<CreateSizeResponse['data']> {
    return await this.db.size.create({
      data: {
        name: size.name,
      },
    });
  }

  async update(id: number, size: UpdateSizeRequest['body']): Promise<UpdateSizeResponse['data']> {
    return await this.db.size.update({
      where: { id },
      data: {
        name: size.name,
      },
    });
  }

  async delete(id: number) {
    return await this.db.size.delete({ where: { id } });
  }
}
