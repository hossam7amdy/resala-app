import { formatDate } from '@/utils/date-time-formatter';
import type { Image } from '@resala/shared';
import { Image as AntImage, List, Tag } from 'antd';
import React, { useMemo } from 'react';

import { MoreMenu } from './more-menu';

export const ImagesList: React.FC<{ images: Image[] }> = ({ images }) => {
  const sortedImages = useMemo(() => {
    return images.sort(a => (a.isPrimary ? -1 : 1));
  }, [images]);

  return (
    <List
      dataSource={sortedImages}
      renderItem={image => (
        <List.Item extra={<MoreMenu image={{ ...image, productId: image.productId }} />}>
          <List.Item.Meta
            avatar={<AntImage src={image.imageUrl} alt="Product Image" height={100} />}
            title={image.isPrimary ? <Tag color="green">Primary</Tag> : null}
            description={formatDate(image.createdAt)}
          />
        </List.Item>
      )}
    />
  );
};
