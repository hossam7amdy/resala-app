import { BackButton } from '@/components';
import { ProductEditor } from '@/features/products';
import { listAllCategories } from '@/fetch/category';
import { listAllColors } from '@/fetch/colors';
import { listMedias } from '@/fetch/media';
import { findProduct } from '@/fetch/products';
import { listAllSizes } from '@/fetch/sizes';
import { ROUTES } from '@/routes';
import type { Params } from '@/types';
import type { ListMediaRequest } from '@resala/shared';
import { Breadcrumb, Card, Col, Row } from 'antd';
import Link from 'next/link';
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
    <Row gutter={[10, 20]}>
      <Col span={24}>
        <Breadcrumb
          items={[
            { title: <BackButton /> },
            { title: <Link href={ROUTES.PRODUCTS}>Products</Link> },
            { title: product.enName },
            { title: 'Edit' },
          ]}
        />
      </Col>
      <Col span={24}>
        <Card title={`${product.enName} | ${product.arName}`}>
          <ProductEditor
            categories={categories}
            product={product!}
            medias={medias}
            colors={colors}
            sizes={sizes}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default EditProductPage;
