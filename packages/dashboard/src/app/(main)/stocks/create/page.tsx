import { SelectColor, SelectProduct, SelectSize, StockForm } from '@/features/stocks';
import { Card } from 'antd';
import SkeletonInput from 'antd/es/skeleton/Input';
import { Suspense } from 'react';

const CreateStockPage: React.FC<{ searchParams?: { productId?: string } }> = ({ searchParams }) => {
  return (
    <Card>
      <StockForm
        stock={{ productId: Number(searchParams?.productId) }}
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
        selectProduct={<SelectProduct />}
      />
    </Card>
  );
};

export default CreateStockPage;
