import { BadRequestError } from '@/exceptions';

export class AnnouncementItemTranslation {
  constructor(
    public langCode: string,
    public text: string
  ) {
    if (['ar', 'en'].includes(langCode)) {
      throw new BadRequestError('Invalid language code');
    }
  }
}
