import type { HomepageSection, SectionData, SectionTranslation } from '@prisma/client';

import type { AnnouncementSection } from '../../domain/models/AnnouncementSection';

interface AnnouncementSectionEntity extends HomepageSection {
  sectionData: Array<
    Pick<SectionData, 'link' | 'order' | 'sectionId'> & {
      translations: Array<Pick<SectionTranslation, 'sectionId' | 'title' | 'langCode'>>;
    }
  >;
}

export class AnnouncementSectionMapper {
  static toDomain(section: AnnouncementSectionEntity): AnnouncementSection {
    return {
      id: section.id,
      name: section.name,
      isActive: section.isActive,
      items: section.sectionData.map(item => ({
        link: item.link,
        order: item.order,
        translations: item.translations.map(t => ({
          langCode: t.langCode,
          text: t.title,
        })),
      })),
      createdAt: section.createdAt,
      updatedAt: section.updatedAt,
    };
  }

  static toPersistence(section: AnnouncementSection): AnnouncementSectionEntity {
    return {
      id: section.id,
      name: section.name,
      type: 'announcement',
      isActive: section.isActive,
      sectionData: section.items.map(item => ({
        sectionId: section.id,
        order: item.order,
        link: item.link,
        translations: item.translations.map(t => ({
          sectionId: section.id,
          langCode: t.langCode,
          title: t.text,
        })),
      })),
      createdAt: section.createdAt,
      updatedAt: section.updatedAt,
    };
  }
}
