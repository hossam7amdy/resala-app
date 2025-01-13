import type { IAnnouncementRepository } from '../../domain/contracts/IAnnouncementRepository';
import type { AnnouncementItemTranslation } from '../../domain/models/AnnouncementItemTranslation';
import type { AnnouncementDto } from '../dto/AnnouncementDto';

export interface IListAnnouncementSectionsDto {
  language: string;
  includeTranslations?: boolean;
}

export class ListAnnouncementSections {
  constructor(private announcementRepo: IAnnouncementRepository) {}

  async execute(input: IListAnnouncementSectionsDto): Promise<AnnouncementDto[]> {
    const announcements = await this.announcementRepo.findMany();

    return announcements.map(a => ({
      id: a.id,
      name: a.name,
      isActive: a.isActive,
      createdAt: a.createdAt,
      updatedAt: a.updatedAt,
      items: a.items.map(it => ({
        ...it,
        text: this._getTranslation(it.translations, input.language).text,
        translations: input.includeTranslations ? it.translations : [],
      })),
    }));
  }

  private _getTranslation(translations: AnnouncementItemTranslation[], language: string) {
    const translation = translations?.find(t => t.langCode === language);

    if (!translation) {
      return translations.at(0)!;
    }

    return translation;
  }
}
