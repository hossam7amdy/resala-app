import { StockEditor } from '@/features/stocks';
import { listAllColors } from '@/fetch/colors';
import { listMedias } from '@/fetch/media';
import { findProduct } from '@/fetch/products';
import { listAllSizes } from '@/fetch/sizes';
import { Card } from 'antd';

interface CreateStockPageProps {
  searchParams: { productId: string };
}
const CreateStockPage: React.FC<CreateStockPageProps> = async ({ searchParams }) => {
  const [product, medias, sizes, colors] = await Promise.all([
    findProduct(searchParams.productId),
    listMedias({} as never),
    listAllSizes(),
    listAllColors(),
  ]);

  return (
    <Card title={`${product.enName} | ${product.arName}`}>
      <StockEditor productDetails={product} medias={medias} sizes={sizes} colors={colors} />
    </Card>
  );
};

export default CreateStockPage;
