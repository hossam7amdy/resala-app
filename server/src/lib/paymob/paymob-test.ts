import { describe, expect, test } from '@jest/globals';

import { paymob } from '.';

describe('Test Paymob Integration', () => {
  const getAuthToken = async () => {
    const result = await paymob.authenticate();

    expect(result).toMatchObject({
      token: expect.any(String),
    });

    return result.token;
  };

  const getOrderId = async (order: any) => {
    const result = await paymob.createOrder(order);

    expect(result).toMatchObject({
      id: expect.any(Number),
    });

    return result.id;
  };

  test('Test Payment API Flow', async () => {
    const order = {
      amount_cents: 120 * 100,
      // merchant_order_id: Math.floor(Math.random() * 1000000),
      items: [
        {
          name: 'Product 1',
          amount_cents: 120 * 100,
          description: 'Product 1 description',
          quantity: 1,
        },
      ],
    };

    const token = await getAuthToken();

    const id = await getOrderId({
      auth_token: token,
      delivery_needed: false,
      ...order,
    });

    const result = await paymob.checkout({
      order_id: id,
      auth_token: token,
      amount_cents: order.amount_cents,
      expiration: 3600,
      billing_data: {
        first_name: 'John',
        last_name: 'Doe',
        email: 'test@mail.com',
        phone_number: '01000000000',
        country: 'EG',
        state: 'Cairo',
        city: 'Cairo',
        street: 'Street 1',
        building: 'Building 1',
        floor: 'Floor 1',
        apartment: 'Apartment 1',
        postal_code: '12345',
        shipping_method: 'PICKUP',
      },
      lock_order_when_paid: true,
    });

    expect(result).toMatchObject({
      token: expect.any(String),
      iframeUrl: expect.any(String),
    });
  });
});
