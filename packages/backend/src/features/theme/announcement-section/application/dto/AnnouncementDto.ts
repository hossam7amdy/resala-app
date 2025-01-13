interface AnnouncementItemDto {
  text: string;
  order: number;
  link: string | null;
  translations: {
    langCode: string;
    text: string;
  }[];
}

export interface AnnouncementDto {
  id: string;
  name: string;
  isActive: boolean;
  items: AnnouncementItemDto[];
  createdAt: Date;
  updatedAt: Date;
}
