import { listAllCategories } from '@/actions/category';
import { listAllColors } from '@/actions/colors';
import { listMedias } from '@/actions/media';
import { listAllSizes } from '@/actions/sizes';
import { ProductEditor } from '@/features/products';
import type { ListMediaRequest } from '@resala/shared';
import { Card } from 'antd';

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

  return (
    <Card title="Create Product">
      <ProductEditor categories={categories} medias={medias} colors={colors} sizes={sizes} />
    </Card>
  );
};

export default CreateProductPage;
