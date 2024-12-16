import { MediaTable } from '@/features/media';
import { listMedias } from '@/fetch/media';

const MediaPage = async () => {
  const medias = await listMedias();

  return <MediaTable medias={medias} />;
};

export default MediaPage;
