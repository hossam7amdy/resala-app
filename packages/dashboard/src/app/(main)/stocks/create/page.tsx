import { SelectColor, SelectSize, StockForm } from '@/features/stocks';
import { Card } from 'antd';
import SkeletonInput from 'antd/es/skeleton/Input';
import { Suspense } from 'react';

const CreateStockPage: React.FC<{ searchParams?: { productId?: string } }> = ({ searchParams }) => {
  const productId = searchParams?.productId ? parseInt(searchParams.productId) : undefined;

  return (
    <Card>
      <StockForm
        stock={{ productId }}
        selectSize={
          <Suspense fallback={<SkeletonInput active block size="large" />}>
            <SelectSize />
          </Suspense>
        }
        selectColor={
          <Suspense fallback={<SkeletonInput active block size="large" />}>
            <SelectColor />
          </Suspense>
        }
      />
    </Card>
  );
};

export default CreateStockPage;
