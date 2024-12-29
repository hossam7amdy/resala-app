import type { DataStore } from '@/lib/db';
import type { CreateColorRequest, GetColorResponse, UpdateColorRequest } from '@resala/shared';

export class ColorService {
  constructor(private readonly db: DataStore) {}

  async find(id: string): Promise<GetColorResponse['data']> {
    return await this.db.color.findUniqueOrThrow({ where: { id } });
  }

  async list() {
    return await this.db.color.findMany();
  }

  async create(color: CreateColorRequest['body']) {
    return await this.db.color.create({ data: color });
  }

  async update(colorId: string, color: UpdateColorRequest['body']) {
    return await this.db.color.update({ where: { id: colorId }, data: color });
  }

  async delete(colorId: string) {
    return await this.db.color.delete({ where: { id: colorId } });
  }
}
