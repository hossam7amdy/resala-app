'use client';

import { updateUser } from '@/actions/users';
import { useMutation, useNotification } from '@/hooks';
import type { User } from '@resala/shared';
import { MarketingState } from '@resala/shared';
import { Button, Checkbox, Flex, Form, Typography } from 'antd';
import React from 'react';

interface FormValues {
  emailMarketingReference: boolean;
  smsMarketingReference: boolean;
}

interface EditMarketingReferencesFormProps {
  customer: User;
  onDone?: () => void;
  onCancel?: () => void;
}

export const EditMarketingReferencesForm: React.FC<EditMarketingReferencesFormProps> = ({
  customer,
  onDone,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const notification = useNotification();
  const { isLoading, mutate } = useMutation({
    mutationFn: (values: FormValues) => {
      return updateUser(customer.id, {
        emailMarketingState: values.emailMarketingReference
          ? MarketingState.SUBSCRIBED
          : MarketingState.UNSUBSCRIBED,
        smsMarketingState: values.smsMarketingReference
          ? MarketingState.SUBSCRIBED
          : MarketingState.UNSUBSCRIBED,
      });
    },
    onSuccess: () => {
      notification.success('Customer updated successfully');
      form.resetFields();
      onDone?.();
    },
    onError: error => {
      notification.error(error.message);
    },
  });

  return (
    <Form form={form} name="edit-customer-marketing-references" layout="vertical" onFinish={mutate}>
      <Form.Item
        name="emailMarketingReference"
        valuePropName="checked"
        label={null}
        initialValue={customer.emailMarketingState === MarketingState.SUBSCRIBED}
        className="mb-1"
      >
        <Checkbox disabled={!customer.emailVerified}>
          Customer agreed to receive marketing emails.
        </Checkbox>
      </Form.Item>
      <Form.Item
        name="smsMarketingReference"
        valuePropName="checked"
        label={null}
        initialValue={customer.smsMarketingState === MarketingState.SUBSCRIBED}
      >
        <Checkbox disabled={!customer.phoneNumberVerified}>
          Customer agreed to receive SMS marketing text messages.
        </Checkbox>
      </Form.Item>

      <Form.Item className="px-4">
        <Typography.Text type="secondary">
          You should ask your customers for permission before you subscribe them to your marketing
          emails or SMS.
        </Typography.Text>
      </Form.Item>

      <Form.Item noStyle>
        <Flex gap={10} justify="end">
          <Button type="default" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Save
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};
