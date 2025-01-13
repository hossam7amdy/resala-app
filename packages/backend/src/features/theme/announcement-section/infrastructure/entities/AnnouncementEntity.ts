import type { HomepageSection, SectionData, SectionTranslation } from '@prisma/client';

export interface AnnouncementEntity extends Pick<HomepageSection, 'name' | 'isActive'> {
  sectionData: Array<
    Pick<SectionData, 'sectionId' | 'order' | 'link'> & {
      translations: Array<Pick<SectionTranslation, 'langCode' | 'title'>>;
    }
  >;
}
