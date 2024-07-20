'use client';

import { formatDate } from '@/lib/util';
import { FolderOutlined } from '@ant-design/icons';
import type { GetStocksListResponse } from '@resala/shared';
import { Image as AntImage, Button, List, Modal, Tag } from 'antd';
import React, { useMemo, useState } from 'react';

import MoreMenu from './more-menu';

const StockColorImages: React.FC<{
  stock: GetStocksListResponse['data']['stocks'][0];
}> = ({ stock }) => {
  const [open, setOpen] = useState(false);

  const sortedImages = useMemo(() => {
    return stock.images.sort((a, b) => {
      // Primary image should be first
      if (a.isPrimary) return -1;
      if (b.isPrimary) return 1;
      // otherwise sort by createdAt
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [stock.images]);

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
        <List
          dataSource={sortedImages}
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
