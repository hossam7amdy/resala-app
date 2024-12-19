import { ProductEditor } from '@/features/products';
import { listAllCategories } from '@/fetch/category';
import { listMedias } from '@/fetch/media';
import type { ListMediaRequest } from '@resala/shared';

interface CreateProductPageProps {
  searchParams: ListMediaRequest['query'];
}
const CreateProductPage: React.FC<CreateProductPageProps> = async ({ searchParams }) => {
  const [categories, medias] = await Promise.all([listAllCategories(), listMedias(searchParams)]);

  return <ProductEditor categories={categories} medias={medias} />;
};

export default CreateProductPage;
