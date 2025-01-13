import { NotFoundError } from '@/exceptions';

import type { IAnnouncementRepository } from '../../domain/contracts/IAnnouncementRepository';

export interface IDeleteAnnouncementDto {
  id: string;
}

export class DeleteAnnouncementSection {
  constructor(private readonly _repository: IAnnouncementRepository) {}

  async execute(request: IDeleteAnnouncementDto): Promise<void> {
    await this._assertAnnouncementExists(request.id);
    await this._repository.delete(request.id);
  }

  private async _assertAnnouncementExists(id: string): Promise<void> {
    const announcement = await this._repository.findById(id);

    if (!announcement) {
      throw new NotFoundError('Announcement section not found');
    }
  }
}
