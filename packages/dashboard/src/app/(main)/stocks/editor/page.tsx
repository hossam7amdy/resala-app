import { listAllColors } from '@/actions/colors';
import { listMedias } from '@/actions/media';
import { findProduct } from '@/actions/products';
import { listAllSizes } from '@/actions/sizes';
import { StockEditor } from '@/features/stocks';
import { Card } from 'antd';

interface CreateStockPageProps {
  searchParams: Promise<{ productId: string }>;
}
const CreateStockPage: React.FC<CreateStockPageProps> = async props => {
  const searchParams = await props.searchParams;
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
