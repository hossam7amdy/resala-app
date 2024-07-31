import { formatCurrency } from '@/lib/util';
import type { GetOrderResponse } from '@resala/shared';
import { Col, Flex, Row, Typography } from 'antd';
import React from 'react';

export const ShippingDetailsTab: React.FC<{ order: GetOrderResponse['data'] }> = ({ order }) => {
  return (
    <Row>
      <Col span={8}>
        <Flex gap={5}>
          <div>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>Country</Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>State</Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>City</Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>Street</Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>Building</Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>Floor</Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>Address</Typography.Paragraph>
          </div>
          <div>
            <Typography.Paragraph>: {order?.shippingDetails?.address.country}</Typography.Paragraph>
            <Typography.Paragraph>: {order?.shippingDetails?.address.state}</Typography.Paragraph>
            <Typography.Paragraph>: {order?.shippingDetails?.address.city}</Typography.Paragraph>
            <Typography.Paragraph>: {order?.shippingDetails?.address.street}</Typography.Paragraph>
            <Typography.Paragraph>
              : {order?.shippingDetails?.address.building}
            </Typography.Paragraph>
            <Typography.Paragraph>: {order?.shippingDetails?.address.floor}</Typography.Paragraph>
            <Typography.Paragraph>
              : {order?.shippingDetails?.address.address || 'Not provided'}
            </Typography.Paragraph>
          </div>
        </Flex>
      </Col>

      <Col>
        <Flex gap={5}>
          <div>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>First Name</Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>Last Name</Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>Phone</Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>E-mail</Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>
              Shipping Cost
            </Typography.Paragraph>
          </div>
          <div>
            <Typography.Paragraph>
              : {order?.shippingDetails?.address.firstName}
            </Typography.Paragraph>
            <Typography.Paragraph>
              : {order?.shippingDetails?.address.lastName}
            </Typography.Paragraph>
            <Typography.Paragraph>
              : {order?.shippingDetails?.address.phone || order?.user?.phone}
            </Typography.Paragraph>
            <Typography.Paragraph>: {order?.user?.email}</Typography.Paragraph>
            <Typography.Paragraph>
              : {formatCurrency(order?.shippingDetails?.cost)}
            </Typography.Paragraph>
          </div>
        </Flex>
      </Col>
    </Row>
  );
};
