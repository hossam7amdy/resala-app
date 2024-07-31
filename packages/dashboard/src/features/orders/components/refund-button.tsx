'use client';

import { refundPayment } from '@/actions/payment';
import { useMutation, useNotification } from '@/hooks';
import type { Payment } from '@resala/shared';
import { Button, Flex, Form, Input, InputNumber, Modal } from 'antd';
import React, { useState } from 'react';

export const RefundButton: React.FC<{ payment: Payment; orderAmount: number }> = ({
  payment,
  orderAmount,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const notification = useNotification();

  const { isLoading, mutate } = useMutation({
    mutationFn: refundPayment,
    onSuccess: () => {
      setIsModalOpen(false);
      notification.success('Payment refunded successfully');
    },
    onError: error => {
      notification.error(error.message);
    },
  });

  return (
    <>
      <Button size="small" type="primary" onClick={() => setIsModalOpen(true)}>
        Refund
      </Button>

      <Modal
        open={isModalOpen}
        footer={null}
        maskClosable={false}
        closeIcon={null}
        styles={{
          body: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      >
        <Form
          layout="vertical"
          name={`refund-${payment.transactionId}`}
          initialValues={{ transactionId: payment.transactionId, amount: orderAmount }}
          onFinish={mutate}
        >
          <Form.Item name="transactionId" hidden>
            <Input />
          </Form.Item>

          <Form.Item
            required
            label="Refund Amount"
            name="amount"
            rules={[{ required: true, message: 'Please enter the refund amount' }]}
          >
            <InputNumber min={1} max={orderAmount} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item noStyle>
            <Flex gap={5}>
              <Button
                htmlType="reset"
                onClick={() => setIsModalOpen(false)}
                disabled={isLoading}
                block
              >
                Cancel
              </Button>

              <Button htmlType="submit" type="primary" loading={isLoading} block>
                Submit
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
