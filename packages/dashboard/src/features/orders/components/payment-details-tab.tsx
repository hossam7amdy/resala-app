'use client';

import { ResalaTooltip } from '@/components';
import { CopyOutlined } from '@ant-design/icons';
import type { Payment } from '@resala/shared';
import { Button, Col, Flex, Row, Typography } from 'antd';
import React from 'react';

import { TransactionDetails } from './transaction-details';

export const PaymentDetailsTab: React.FC<{ payment: Payment }> = ({ payment }) => {
  return (
    <>
      <Row>
        <Col span={12}>
          <Flex gap={5}>
            <div>
              <Typography.Paragraph style={{ fontWeight: 'bold' }}>
                Transaction ID
              </Typography.Paragraph>
              <Typography.Paragraph style={{ fontWeight: 'bold' }}>
                Order Reference
              </Typography.Paragraph>
            </div>
            <div>
              <Typography.Paragraph>: {payment.transactionId || 'N/A'}</Typography.Paragraph>
              <Typography.Paragraph>: {payment.transactionOrderId || 'N/A'}</Typography.Paragraph>
            </div>
          </Flex>
        </Col>

        <Col span={12}>
          <Flex gap={5}>
            <div>
              <Typography.Paragraph style={{ fontWeight: 'bold' }}>Order Link</Typography.Paragraph>
            </div>
            <div>
              <Flex gap={5} align="center">
                :
                <Button size="small" type="primary" target="_blank" href={`${payment.paymentLink}`}>
                  Preview
                </Button>
                <ResalaTooltip title="Copied!" trigger="click">
                  <Button
                    size="small"
                    type="text"
                    icon={<CopyOutlined />}
                    onClick={() => {
                      navigator.clipboard.writeText(payment.paymentLink!);
                    }}
                  />
                </ResalaTooltip>
              </Flex>
            </div>
          </Flex>
        </Col>
      </Row>

      <TransactionDetails payment={payment} />
    </>
  );
};
