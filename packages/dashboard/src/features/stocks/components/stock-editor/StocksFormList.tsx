'use client';

import { Collapse, Flex, Form } from 'antd';
import React from 'react';

import { AddFormItemButton } from './AddFormItemButton';
import { ColorMediasFormItem } from './ColorMediasFormItem';
import { QuantityFormItem } from './QuantityFormItem';
import { RemoveFormItemButton } from './RemoveFormItemButton';
import { SelectColorFormItem } from './SelectColorFormItem';
import { SelectSizeFormItem } from './SelectSizeFormItem';
import { TotalQuantityFormItem } from './TotalQuantityFormItem';
import { MAX_STOCK_ITEMS } from './constant';
import type { StocksFormListProps } from './types';

const StocksFormList: React.FC<StocksFormListProps> = ({ sizes, colors, medias, variants }) => {
  return (
    <Form.List name="variants" initialValue={variants?.length ? variants : [{}]}>
      {(fields, { add, remove }) => (
        <Flex vertical gap={10}>
          {fields.map((field, index, formList) => (
            <Collapse
              key={field.name}
              defaultActiveKey={[field.name]}
              size="small"
              items={[
                {
                  key: field.key,
                  label: `Color #${field.name + 1}`,
                  extra: (
                    <RemoveFormItemButton
                      disabled={formList.length === 1}
                      onClick={() => remove(field.name)}
                    />
                  ),
                  children: (
                    <>
                      <ColorMediasFormItem
                        fieldName={field.name}
                        medias={medias}
                        initialSelection={
                          variants?.[index]?.medias ? variants?.[index]?.medias : undefined
                        }
                      />

                      <Flex gap={10} className="mr-9">
                        <SelectColorFormItem fieldName={field.name} colors={colors} />
                        <TotalQuantityFormItem fieldName={field.name} />
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
                            {subFields.map((subField, _, subFormList) => (
                              <Flex key={subField.key} align={'end'} gap={10}>
                                <SelectSizeFormItem
                                  parentFieldName={field.name}
                                  fieldName={subField.name}
                                  sizes={sizes}
                                />
                                <QuantityFormItem fieldName={subField.name} />
                                <Form.Item>
                                  <RemoveFormItemButton
                                    disabled={subFormList.length === 1}
                                    onClick={() => subOpt.remove(subField.name)}
                                  />
                                </Form.Item>
                              </Flex>
                            ))}
                            <AddFormItemButton
                              onClick={subOpt.add}
                              disabled={fields.length >= MAX_STOCK_ITEMS}
                            >
                              Add another size
                            </AddFormItemButton>
                          </div>
                        )}
                      </Form.List>
                    </>
                  ),
                },
              ]}
            />
          ))}

          <AddFormItemButton block onClick={add} disabled={fields.length >= MAX_STOCK_ITEMS}>
            Add another color
          </AddFormItemButton>
        </Flex>
      )}
    </Form.List>
  );
};

export { StocksFormList };
