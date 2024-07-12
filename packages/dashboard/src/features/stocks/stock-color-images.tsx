'use client';

import { deleteProductImage } from '@/actions/image';
import { DeleteButton } from '@/components';
import { formatDate } from '@/lib/util';
import { FolderOutlined, MoreOutlined } from '@ant-design/icons';
import type { GetStocksListResponse } from '@resala/shared';
import { Image as AntImage, Button, List, Modal, Space, Tag } from 'antd';
import React, { useState } from 'react';

const StockColorImages: React.FC<{
  stock: GetStocksListResponse['data']['stocks'][0];
}> = ({ stock }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        style={{ width: '100%' }}
        type="text"
        icon={<FolderOutlined />}
        onClick={() => setOpen(true)}
        disabled={!stock.images.length}
      >
        {' '}
        {stock.images.length}
      </Button>
      <Modal footer={null} open={open} onCancel={() => setOpen(false)} maskClosable={false}>
        <List
          dataSource={stock.images}
          renderItem={image => (
            <List.Item
              extra={
                <Space direction="vertical" align="center">
                  <Button type="link" icon={<MoreOutlined />} />
                  <DeleteButton
                    deleteAction={deleteProductImage.bind(
                      null,
                      `${stock.product.id}`,
                      image.id.toString()
                    )}
                  />
                </Space>
              }
            >
              <List.Item.Meta
                avatar={<AntImage src={image.imageUrl} alt="Product Image" height={100} />}
                title={image.isPrimary ? <Tag color="green">Primary</Tag> : null}
                description={formatDate(image.createdAt)}
              />
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
};

export default StockColorImages;
