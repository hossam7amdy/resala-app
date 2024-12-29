import { listMedias } from '@/actions/media';
import { MediaTable } from '@/features/media';
import type { ListMediaRequest } from '@resala/shared';

interface MediaPageProps {
  searchParams: Promise<ListMediaRequest['query']>;
}
const MediaPage: React.FC<MediaPageProps> = async props => {
  const searchParams = await props.searchParams;
  const medias = await listMedias(searchParams);

  return <MediaTable medias={medias} />;
};

export default MediaPage;
