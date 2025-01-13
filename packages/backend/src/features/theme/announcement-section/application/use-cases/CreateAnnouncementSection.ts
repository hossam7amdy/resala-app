import type { IAnnouncementRepository } from '../../domain/contracts/IAnnouncementRepository';
import { AnnouncementSection } from '../../domain/models/AnnouncementSection';

export interface ITranslationDto {
  langCode: string;
  text: string;
}

export interface ICreateAnnouncementDto {
  name: string;
  items: Array<{
    order: number;
    link: string | null;
    translations: Array<ITranslationDto>;
  }>;
}

export class CreateAnnouncementSection {
  constructor(private readonly _repository: IAnnouncementRepository) {}

  async execute(request: ICreateAnnouncementDto): Promise<{ id: string }> {
    const announcement = AnnouncementSection.create(request.name, request.items);

    await this._repository.save(announcement);

    return { id: announcement.id };
  }
}
