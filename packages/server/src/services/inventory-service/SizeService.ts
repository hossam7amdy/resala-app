import type {
  CreateSizeRequest,
  CreateSizeResponse,
  GetSizeResponse,
  GetSizesListResponse,
  UpdateSizeRequest,
  UpdateSizeResponse,
} from '@resala/shared';

import type { InventoryRepository } from '../../repositories/index.js';
import { ConflictError, NotFoundError } from '../../utils/ApiErrors.js';

export default class SizeService {
  constructor(private readonly inventoryRepo: InventoryRepository) {}

  async findSizeById(sizeId: number): Promise<GetSizeResponse['data']> {
    const size = await this.inventoryRepo.size.findById(sizeId);

    if (!size) {
      throw new NotFoundError('Size not found');
    }

    return size;
  }

  async listSizes(): Promise<GetSizesListResponse['data']> {
    return await this.inventoryRepo.size.list();
  }

  async createSize(size: CreateSizeRequest['body']): Promise<CreateSizeResponse['data']> {
    const exist = await this.inventoryRepo.size.find(size.name);
    if (exist) {
      throw new ConflictError('Size already exists');
    }

    return await this.inventoryRepo.size.create({
      name: size.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async updateSize(
    id: number,
    size: UpdateSizeRequest['body']
  ): Promise<UpdateSizeResponse['data']> {
    await this.findSizeById(id);

    const exist = await this.inventoryRepo.size.find(size.name);
    if (exist && exist.id !== id) {
      throw new ConflictError('Size already exists');
    }

    return await this.inventoryRepo.size.update(id, {
      name: size.name,
      updatedAt: new Date(),
    });
  }

  async deleteSize(id: number) {
    await this.findSizeById(id);

    try {
      return await this.inventoryRepo.size.delete(id);
    } catch (error) {
      throw new ConflictError('Size is in use and cannot be deleted');
    }
  }
}
