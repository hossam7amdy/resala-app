import type { AnnouncementSection } from '../models/AnnouncementSection';

export interface IAnnouncementRepository {
  save(section: AnnouncementSection): Promise<void>;
  findMany(): Promise<AnnouncementSection[]>;
  findById(id: string): Promise<AnnouncementSection | null>;
  delete(id: string): Promise<void>;
}
