import type { PrismaClient } from '@prisma/client';

import type { IAnnouncementRepository } from '../../domain/contracts/IAnnouncementRepository';
import type { AnnouncementSection } from '../../domain/models/AnnouncementSection';
import { AnnouncementSectionMapper } from '../mappers/AnnouncementSectionMapper';

export class PrismaAnnouncementSectionRepository implements IAnnouncementRepository {
  constructor(private _prisma: PrismaClient) {}

  async save(section: AnnouncementSection): Promise<void> {
    const { sectionData, ...data } = AnnouncementSectionMapper.toPersistence(section);

    await this._prisma.$transaction(async trx => {
      await trx.homepageSection.upsert({
        create: data,
        update: data,
        where: {
          id: section.id,
        },
      });

      await trx.sectionData.deleteMany({
        where: {
          sectionId: section.id,
        },
      });

      await Promise.all(
        sectionData.map(({ translations, ...item }) =>
          trx.sectionData.create({
            data: {
              ...item,
              translations: {
                createMany: {
                  data: translations,
                  skipDuplicates: true,
                },
              },
            },
          })
        )
      );
    });
  }

  async findMany(): Promise<AnnouncementSection[]> {
    const sections = await this._prisma.homepageSection.findMany({
      include: {
        sectionData: {
          include: {
            translations: true,
          },
        },
      },
      where: {
        type: 'announcement',
      },
    });

    return sections.map(section => AnnouncementSectionMapper.toDomain(section));
  }

  async findById(id: string): Promise<AnnouncementSection | null> {
    const section = await this._prisma.homepageSection.findUnique({
      include: {
        sectionData: {
          include: {
            translations: true,
          },
        },
      },
      where: {
        id,
        type: 'announcement',
      },
    });

    if (!section) {
      return null;
    }

    return AnnouncementSectionMapper.toDomain(section);
  }

  async delete(id: string): Promise<void> {
    await this._prisma.homepageSection.delete({
      where: {
        id,
        type: 'announcement',
      },
    });
  }
}
