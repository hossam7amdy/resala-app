import { listProductsPaginated } from '@/data/product';
import { Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';

const SelectProduct = async ({ searchParams }: { searchParams: { query?: string } }) => {
  console.log('searchParams', searchParams);
  const query = searchParams.query || '';
  const { products } = await listProductsPaginated({ query, page: 1, limit: 10 });

  return (
    <FormItem required name="productId" label="Product">
      <Select
        showSearch
        allowClear
        placeholder="Select product"
        options={products.map(product => ({
          label: `${product.enName} | ${product.arName}`,
          value: product.id,
        }))}
      />
    </FormItem>
  );
};

export default SelectProduct;
