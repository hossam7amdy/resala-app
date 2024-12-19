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
  const product = await findProduct(searchParams.productId);

  const [images, sizes, colors] = await Promise.all([
    listMedias({} as never),
    listAllSizes(),
    listAllColors(),
  ]);

  return (
    <Card title={`${product.enName} | ${product.arName}`}>
      <StockEditor productDetails={product} images={images} sizes={sizes} colors={colors} />
    </Card>
  );
};

export default CreateStockPage;
