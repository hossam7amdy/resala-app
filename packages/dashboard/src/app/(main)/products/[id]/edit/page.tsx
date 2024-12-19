import { ProductEditor } from '@/features/products';
import { listAllCategories } from '@/fetch/category';
import { listMedias } from '@/fetch/media';
import { findProduct } from '@/fetch/products';
import type { Params } from '@/types';
import type { ListMediaRequest } from '@resala/shared';
import { notFound } from 'next/navigation';

interface EditProductPageProps {
  params: Params;
  searchParams: ListMediaRequest['query'];
}
const EditProductPage: React.FC<EditProductPageProps> = async ({ params, searchParams }) => {
  const [categories, product, medias] = await Promise.all([
    listAllCategories(),
    findProduct(params.id),
    listMedias(searchParams),
  ]);

  if (!product) {
    return notFound();
  }

  return <ProductEditor categories={categories} product={product!} medias={medias} />;
};

export default EditProductPage;
