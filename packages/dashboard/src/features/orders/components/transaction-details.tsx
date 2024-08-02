'use client';

import { formatCurrency } from '@/utils/currency-formatter';
import { formatDateTime } from '@/utils/date-time-formatter';
import type { Payment } from '@resala/shared';
import { Col, Divider, Flex, Row, Spin, Typography } from 'antd';
import React from 'react';

import { useTransaction } from '..';

export const TransactionDetails: React.FC<{ payment: Payment }> = ({
  payment: { transactionId },
}) => {
  const { isLoading, data } = useTransaction(transactionId);

  if (isLoading) {
    return (
      <Flex align="center" justify="center" style={{ height: 100 }}>
        <Spin />
      </Flex>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Row>
      <Divider>Transaction Details</Divider>

      <Col span={12}>
        <Flex gap={5}>
          <div>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>Amount</Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>Created at</Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>Payment Type</Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>
              Payment Source
            </Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>Trnx Success</Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>Trnx Pending</Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>
              Captured Amount
            </Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>3D Secure</Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>Voided</Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>Refunded</Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>
              Amount Refunded
            </Typography.Paragraph>
          </div>
          <div>
            <Typography.Paragraph>
              : {formatCurrency((data.amount_cents || 0) / 100)}
            </Typography.Paragraph>
            <Typography.Paragraph>
              : {data.created_at && formatDateTime(data?.created_at)}
            </Typography.Paragraph>
            <Typography.Paragraph>: {data.source_data?.type}</Typography.Paragraph>
            <Typography.Paragraph>: {data.source_data?.pan}</Typography.Paragraph>
            <Typography.Paragraph>: {data.success ? 'Yes' : 'No'}</Typography.Paragraph>
            <Typography.Paragraph>: {data.pending ? 'Yes' : 'No'}</Typography.Paragraph>
            <Typography.Paragraph>
              : {formatCurrency((data.capture_amount || 0) / 100)}
            </Typography.Paragraph>
            <Typography.Paragraph>: {data.is_3d_secure ? 'Yes' : 'No'}</Typography.Paragraph>
            <Typography.Paragraph>: {data.is_voided ? 'Yes' : 'No'}</Typography.Paragraph>
            <Typography.Paragraph>: {data.is_refunded ? 'Yes' : 'No'}</Typography.Paragraph>
            <Typography.Paragraph>
              : {formatCurrency((data.refunded_amount_cents || 0) / 100)}
            </Typography.Paragraph>
          </div>
        </Flex>
      </Col>

      <Col>
        <Flex gap={5}>
          <div>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>Routing Bank</Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>
              Card Holder Bank
            </Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>Card Type</Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>
              Merchant Order ID
            </Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>
              Standalone Payment
            </Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>Auth</Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>Captured</Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>
              Converted Amount
            </Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>Fees</Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>Vat</Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>
              Other References
            </Typography.Paragraph>
          </div>
          <div>
            <Typography.Paragraph>: {data.routing_bank}</Typography.Paragraph>
            <Typography.Paragraph>: {data?.card_holder_bank}</Typography.Paragraph>
            <Typography.Paragraph>: {data?.source_data?.sub_type}</Typography.Paragraph>
            <Typography.Paragraph>
              : {data?.merchant_order_id || 'Not Specified'}
            </Typography.Paragraph>
            <Typography.Paragraph>
              : {data?.is_standalone_payment ? 'Yes' : 'No'}
            </Typography.Paragraph>
            <Typography.Paragraph>: {data?.is_auth ? 'Yes' : 'No'}</Typography.Paragraph>
            <Typography.Paragraph>: {data?.is_capture ? 'Yes' : 'No'}</Typography.Paragraph>
            <Typography.Paragraph>: {data?.converted_gross_amount}</Typography.Paragraph>
            <Typography.Paragraph>: {data?.fees}</Typography.Paragraph>
            <Typography.Paragraph>: {data?.vat}</Typography.Paragraph>
            <Typography.Paragraph>
              : {data?.other_references || 'Not Specified'}
            </Typography.Paragraph>
          </div>
        </Flex>
      </Col>
    </Row>
  );
};
