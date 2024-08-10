import type { CreateColorRequest, GetColorResponse, UpdateColorRequest } from '@resala/shared';

import type { InventoryRepository } from '../../repositories/index.js';
import { ConflictError, NotFoundError } from '../../utils/ApiErrors.js';

export default class ColorService {
  constructor(private readonly inventoryRepo: InventoryRepository) {}

  async findColorById(sizeId: number): Promise<GetColorResponse['data']> {
    const color = await this.inventoryRepo.color.findById(sizeId);

    if (!color) {
      throw new NotFoundError('Color not found');
    }

    return color;
  }

  async getColors() {
    return await this.inventoryRepo.color.list();
  }

  async createColor(color: CreateColorRequest['body']) {
    const exist = await this.inventoryRepo.color.find(color);
    if (exist) {
      throw new ConflictError('Color already exists');
    }

    return await this.inventoryRepo.color.create({
      arName: color.arName,
      enName: color.enName,
      code: color.code,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async updateColor(colorId: number, color: UpdateColorRequest['body']) {
    const exist = await this.inventoryRepo.color.findById(colorId);
    if (exist && exist.id !== colorId) {
      throw new ConflictError('Color already exists');
    }

    return await this.inventoryRepo.color.update(colorId, color);
  }

  async deleteColor(colorId: number) {
    await this.findColorById(colorId);

    try {
      return await this.inventoryRepo.color.delete(colorId);
    } catch (error) {
      throw new ConflictError('Color is in use and cannot be deleted');
    }
  }
}
