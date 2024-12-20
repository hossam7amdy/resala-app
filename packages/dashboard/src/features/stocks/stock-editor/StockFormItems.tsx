'use client';

import { MediaSelect } from '@/features/media';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Collapse, Flex, Form, InputNumber } from 'antd';
import React from 'react';

import { SelectColor } from './SelectColor';
import { SelectSize } from './SelectSize';
import type { StockFormItemsProps, StockFormValues } from './types';

const StockFormItems: React.FC<StockFormItemsProps> = ({ sizes, colors, medias, variants }) => {
  const form = Form.useFormInstance<StockFormValues>();

  return (
    <Form.List name="variants" initialValue={variants?.length ? variants : [{}]}>
      {(fields, { add, remove }) => (
        <Flex vertical gap={10}>
          {fields.map((field, index) => (
            <Collapse
              key={field.name}
              defaultActiveKey={[field.name]}
              size="small"
              items={[
                {
                  key: field.key,
                  label: `Stock Item ${field.name + 1}`,
                  extra: (
                    <Button
                      size="small"
                      type="text"
                      disabled={!index}
                      icon={<CloseOutlined />}
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  ),
                  children: (
                    <>
                      <Form.Item
                        required
                        rules={[
                          {
                            required: true,
                            message: 'At least one image is required',
                          },
                        ]}
                        label="Stock Item medias"
                        name={[field.name, 'medias']}
                      >
                        <MediaSelect
                          medias={medias}
                          multiple
                          maxCount={5}
                          onConfirmSelect={medias => {
                            form.setFieldValue(
                              ['variants', field.name, 'medias'],
                              medias.map(m => ({ id: m.id, url: m.url }))
                            );
                          }}
                        />
                      </Form.Item>

                      <Flex gap={10} style={{ marginRight: 30 }}>
                        <Form.Item
                          required
                          rules={[{ required: true }]}
                          label="Color"
                          name={[field.name, 'color']}
                          style={{ flex: 1 }}
                        >
                          <SelectColor colors={colors} />
                        </Form.Item>
                        <Form.Item label="Total quantity" shouldUpdate>
                          {({ getFieldValue }) => {
                            const path = ['variants', field.name, 'sizes'];
                            const sizes = getFieldValue(path)?.filter(Boolean) || [];

                            const totalQuantity = sizes.reduce(
                              (acc: number, size: { quantity: number }) => acc + size.quantity,
                              0
                            );

                            return <InputNumber disabled value={totalQuantity || 0} />;
                          }}
                        </Form.Item>
                      </Flex>

                      {/* Nest Form.List */}
                      <Form.List
                        name={[field.name, 'sizes']}
                        initialValue={
                          variants?.[index]?.sizes.length ? variants?.[index]?.sizes : [{}]
                        }
                      >
                        {(subFields, subOpt) => (
                          <div>
                            {subFields.map((subField, index) => (
                              <Flex key={subField.key} align={'end'} gap={10}>
                                <Form.Item
                                  required
                                  rules={[{ required: true }]}
                                  label="Size"
                                  name={[subField.name, 'size']}
                                  style={{ flex: 1 }}
                                >
                                  <SelectSize sizes={sizes} />
                                </Form.Item>
                                <Form.Item
                                  required
                                  rules={[{ required: true }]}
                                  label="Quantity"
                                  name={[subField.name, 'quantity']}
                                >
                                  <InputNumber placeholder="10" min={0} max={100000} />
                                </Form.Item>
                                <Form.Item>
                                  <Button
                                    type="text"
                                    size="small"
                                    disabled={!index}
                                    icon={<CloseOutlined />}
                                    onClick={() => {
                                      subOpt.remove(subField.name);
                                    }}
                                  />
                                </Form.Item>
                              </Flex>
                            ))}
                            <Button
                              type="dashed"
                              onClick={() => subOpt.add()}
                              icon={<PlusOutlined />}
                            >
                              Add another size
                            </Button>
                          </div>
                        )}
                      </Form.List>
                    </>
                  ),
                },
              ]}
            />
          ))}

          <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
            Add another stock item
          </Button>
        </Flex>
      )}
    </Form.List>
  );
};

export { StockFormItems };
