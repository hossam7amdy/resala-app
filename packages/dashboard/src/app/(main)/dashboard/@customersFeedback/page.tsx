import { Table } from '@/components';
import { listCustomersFeedback } from '@/fetch/dashboard';
import { Card, Flex, Rate } from 'antd';
import React from 'react';

const CustomersFeedback = async () => {
  const data = await listCustomersFeedback();

  return (
    <Card
      size="small"
      title="Recent feedback"
      extra={
        <Flex gap={5} align="centers">
          <span>Average</span>
          <Rate disabled allowHalf defaultValue={data.averageRating} />
        </Flex>
      }
    >
      <Table
        pagination={false}
        columns={[
          { title: 'Customer', dataIndex: 'customer', key: 'customer' },
          { title: 'Product', dataIndex: 'product', key: 'product' },
          { title: 'Rating', dataIndex: 'rating', key: 'rating' },
          {
            title: 'Feedback',
            dataIndex: 'feedback',
            key: 'feedback',
            width: '50%',
          },
        ]}
        dataSource={data.recentFeedback.map(feedback => ({
          key: feedback.id,
          customer: `${feedback.user.firstName} ${feedback.user.lastName}`,
          product: `${feedback.product.enName}`,
          rating: <Rate disabled defaultValue={feedback.rating} />,
          feedback: feedback.comment,
        }))}
      />
    </Card>
  );
};

export default CustomersFeedback;
