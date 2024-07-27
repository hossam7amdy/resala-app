import { ResalaTooltip } from '@/components';
import { findPaymentById } from '@/data/payment';
import { formatCurrency, formatDateTime } from '@/lib/util';
import { CopyOutlined } from '@ant-design/icons';
import type { GetOrderResponse, GetPaymentResponse } from '@resala/shared';
import { Button, Col, Flex, Row, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

export const PaymentDetailsTab: React.FC<{ order: GetOrderResponse['data'] }> = ({ order }) => {
  const [paymentDetails, setPaymentDetails] = useState<GetPaymentResponse['data']>();

  useEffect(() => {
    if (!order.paymentDetails?.transactionRef) return;

    findPaymentById(order.paymentDetails.transactionRef).then(data => setPaymentDetails(data));
  }, [order.paymentDetails?.transactionRef]);

  if (!paymentDetails) {
    return (
      <Flex align="center" justify="center" style={{ height: 100 }}>
        <Spin />
      </Flex>
    );
  }

  return (
    <Row>
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
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>Routing Bank</Typography.Paragraph>
          </div>
          <div>
            <Typography.Paragraph>
              : {formatCurrency((paymentDetails.amount_cents || 0) / 100)}
            </Typography.Paragraph>
            <Typography.Paragraph>
              : {paymentDetails.created_at && formatDateTime(paymentDetails?.created_at)}
            </Typography.Paragraph>
            <Typography.Paragraph>: {paymentDetails.source_data?.type}</Typography.Paragraph>
            <Typography.Paragraph>: {paymentDetails.source_data?.pan}</Typography.Paragraph>
            <Typography.Paragraph>: {paymentDetails.success ? 'Yes' : 'No'}</Typography.Paragraph>
            <Typography.Paragraph>: {paymentDetails.pending ? 'Yes' : 'No'}</Typography.Paragraph>
            <Typography.Paragraph>
              : {formatCurrency((paymentDetails.capture_amount || 0) / 100)}
            </Typography.Paragraph>
            <Typography.Paragraph>
              : {paymentDetails.is_3d_secure ? 'Yes' : 'No'}
            </Typography.Paragraph>
            <Typography.Paragraph>: {paymentDetails.is_voided ? 'Yes' : 'No'}</Typography.Paragraph>
            <Typography.Paragraph>
              : {paymentDetails.is_refunded ? 'Yes' : 'No'}
            </Typography.Paragraph>
            <Typography.Paragraph>
              : {formatCurrency((paymentDetails.refunded_amount_cents || 0) / 100)}
            </Typography.Paragraph>
            <Typography.Paragraph>: {paymentDetails.routing_bank}</Typography.Paragraph>
          </div>
        </Flex>
      </Col>

      <Col>
        <Flex gap={5}>
          <div>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>Order Link</Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>
              Card Holder Bank
            </Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>Card Type</Typography.Paragraph>
            <Typography.Paragraph style={{ fontWeight: 'bold' }}>Order ID</Typography.Paragraph>
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
            <Flex gap={5} align="center">
              <Button
                size="small"
                type="primary"
                target="_blank"
                href={`${order.paymentDetails?.paymentUrl}`}
              >
                Preview
              </Button>
              <ResalaTooltip title="Copied!" trigger="click">
                <Button
                  size="small"
                  type="text"
                  icon={<CopyOutlined />}
                  onClick={() => {
                    navigator.clipboard.writeText(order.paymentDetails?.paymentUrl || '');
                  }}
                />
              </ResalaTooltip>
            </Flex>
            <Typography.Paragraph>: {paymentDetails?.card_holder_bank}</Typography.Paragraph>
            <Typography.Paragraph>: {paymentDetails?.source_data?.sub_type}</Typography.Paragraph>
            <Typography.Paragraph>: {paymentDetails?.order.id}</Typography.Paragraph>
            <Typography.Paragraph>
              : {paymentDetails?.merchant_order_id || 'Not Specified'}
            </Typography.Paragraph>
            <Typography.Paragraph>
              : {paymentDetails?.is_standalone_payment ? 'Yes' : 'No'}
            </Typography.Paragraph>
            <Typography.Paragraph>: {paymentDetails?.is_auth ? 'Yes' : 'No'}</Typography.Paragraph>
            <Typography.Paragraph>
              : {paymentDetails?.is_capture ? 'Yes' : 'No'}
            </Typography.Paragraph>
            <Typography.Paragraph>: {paymentDetails?.converted_gross_amount}</Typography.Paragraph>
            <Typography.Paragraph>: {paymentDetails?.fees}</Typography.Paragraph>
            <Typography.Paragraph>: {paymentDetails?.vat}</Typography.Paragraph>
            <Typography.Paragraph>
              : {paymentDetails?.other_references || 'Not Specified'}
            </Typography.Paragraph>
          </div>
        </Flex>
      </Col>
    </Row>
  );
};
