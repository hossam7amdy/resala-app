'use client';

import { FolderOutlined } from '@ant-design/icons';
import type { GetStocksListResponse } from '@resala/shared';
import { Button, Modal } from 'antd';
import React, { useState } from 'react';

import { ImagesList } from './images-list';

export const StockColorImages: React.FC<{
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
      <Modal
        destroyOnClose
        footer={null}
        open={open}
        onCancel={() => setOpen(false)}
        maskClosable={false}
      >
        <ImagesList
          images={stock.images.map(image => ({
            ...image,
            productId: stock.product.id,
            colorId: stock.color.id,
          }))}
        />
      </Modal>
    </>
  );
};
