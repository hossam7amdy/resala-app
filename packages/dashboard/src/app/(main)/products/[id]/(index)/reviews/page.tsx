import { Pagination, Table } from '@/components';
import { DeleteButton } from '@/features/reviews/delete-button';
import { listReviews } from '@/fetch/reviews';
import { formatDate } from '@/utils/date-time-formatter';
import { Flex, Rate } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import React from 'react';

type SearchParams = {
  page?: number;
  limit?: number;
};
type Params = {
  id: number;
};

interface ProductReviewsProps {
  params: Params;
  searchParams: SearchParams;
}

const ProductReviewsPage: React.FC<ProductReviewsProps> = async ({
  params,
  searchParams: { page = 1, limit = 10 },
}) => {
  const { reviews, pagination } = await listReviews({ page, limit, productId: params.id });

  return (
    <Flex vertical gap={5} align="center">
      <Table
        style={{ width: '100%' }}
        pagination={false}
        columns={[
          { title: 'User', dataIndex: 'user', key: 'user', width: '15%' },
          { title: 'Rating', dataIndex: 'rating', key: 'rating', width: '15%' },
          { title: 'Comment', dataIndex: 'comment', key: 'comment', width: '35%' },
          { title: 'Created', dataIndex: 'createdAt', key: 'createdAt', width: '12.5%' },
          { title: 'Updated', dataIndex: 'updatedAt', key: 'updatedAt', width: '12.5%' },
          { title: 'Actions', dataIndex: 'actions', key: 'actions', width: '10%' },
        ]}
        dataSource={reviews.map(review => ({
          key: review.id,
          user: `${review.user?.firstName} ${review.user?.lastName}`,
          rating: <Rate disabled defaultValue={review.rating} />,
          comment: <Paragraph ellipsis={{ rows: 2, expandable: true }}>{review.comment}</Paragraph>,
          createdAt: formatDate(review.createdAt),
          updatedAt: formatDate(review.updatedAt),
          actions: <DeleteButton id={review.id} userId={review.userId!} />,
        }))}
      />
      <Pagination totalPages={pagination.total} />
    </Flex>
  );
};

export default ProductReviewsPage;
