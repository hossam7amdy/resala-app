import { ProductEditor } from '@/features/products';
import { listAllCategories } from '@/fetch/category';
import { listAllColors } from '@/fetch/colors';
import { listMedias } from '@/fetch/media';
import { findProduct } from '@/fetch/products';
import { listAllSizes } from '@/fetch/sizes';
import type { Params } from '@/types';
import type { ListMediaRequest } from '@resala/shared';
import { notFound } from 'next/navigation';

interface EditProductPageProps {
  params: Params;
  searchParams: ListMediaRequest['query'];
}
const EditProductPage: React.FC<EditProductPageProps> = async ({ params, searchParams }) => {
  const [categories, product, medias, colors, sizes] = await Promise.all([
    listAllCategories(),
    findProduct(params.id),
    listMedias(searchParams),
    listAllColors(),
    listAllSizes(),
  ]);

  if (!product) {
    return notFound();
  }

  return (
    <ProductEditor
      categories={categories}
      product={product!}
      medias={medias}
      colors={colors}
      sizes={sizes}
    />
  );
};

export default EditProductPage;
