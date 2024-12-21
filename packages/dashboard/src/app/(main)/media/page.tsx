import { listMedias } from '@/actions/media';
import { MediaTable } from '@/features/media';
import type { ListMediaRequest } from '@resala/shared';

interface MediaPageProps {
  searchParams: ListMediaRequest['query'];
}
const MediaPage: React.FC<MediaPageProps> = async ({ searchParams }) => {
  const medias = await listMedias(searchParams);

  return <MediaTable medias={medias} />;
};

export default MediaPage;
