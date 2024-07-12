'use client';

import { formatDate } from '@/lib/util';
import { FolderOutlined } from '@ant-design/icons';
import type { GetStocksListResponse } from '@resala/shared';
import { Image as AntImage, Button, List, Modal, Tag } from 'antd';
import React, { useState } from 'react';

import MoreMenu from './more-menu';

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
            <List.Item extra={<MoreMenu image={{ ...image, productId: stock.product.id }} />}>
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
