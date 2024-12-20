import { ProductEditor } from '@/features/products';
import { listAllCategories } from '@/fetch/category';
import { listAllColors } from '@/fetch/colors';
import { listMedias } from '@/fetch/media';
import { listAllSizes } from '@/fetch/sizes';
import type { ListMediaRequest } from '@resala/shared';

interface CreateProductPageProps {
  searchParams: ListMediaRequest['query'];
}
const CreateProductPage: React.FC<CreateProductPageProps> = async ({ searchParams }) => {
  const [categories, medias, colors, sizes] = await Promise.all([
    listAllCategories(),
    listMedias(searchParams),
    listAllColors(),
    listAllSizes(),
  ]);

  return <ProductEditor categories={categories} medias={medias} colors={colors} sizes={sizes} />;
};

export default CreateProductPage;
