'use client';

import { PopconfirmDeleteButton, Table } from '@/components';
import { deleteMedia } from '@/fetch/media';
import { formatDate } from '@/utils/date-time-formatter';
import { formatBytes } from '@/utils/formatBytes';
import type { Media } from '@resala/shared';
import { Image, Typography } from 'antd';
import React from 'react';

interface MediaTableProps {
  medias: Media[];
}
const MediaTable: React.FC<MediaTableProps> = ({ medias }) => {
  return (
    <Table
      rowKey={media => media.id}
      dataSource={medias}
      columns={[
        {
          title: '',
          dataIndex: 'url',
          key: 'url',
          width: 50,
          render: (_, media) => (
            <Image
              src={media.url}
              alt={media.filename}
              style={{ width: 50, height: 50, objectFit: 'cover' }}
            />
          ),
        },
        {
          align: 'left',
          title: 'File name',
          dataIndex: 'filename',
          key: 'filename',
          render: (_, media) => (
            <>
              <p>{media.filename}</p>
              <Typography.Text type="secondary">
                {media.mimetype?.split('/')[1]?.toUpperCase()}
              </Typography.Text>
            </>
          ),
        },
        {
          title: 'Size',
          dataIndex: 'size',
          key: 'size',
          width: 100,
          render: (size: number) => `${formatBytes(size)}`,
        },
        {
          title: 'Date added',
          dataIndex: 'createdAt',
          key: 'createdAt',
          width: 150,
          render: (date: string) => formatDate(date),
        },
        {
          title: 'Actions',
          dataIndex: 'id',
          key: 'actions',
          width: 100,
          render: (_, media) => (
            <PopconfirmDeleteButton onConfirmDelete={() => deleteMedia(media.id)}>
              delete
            </PopconfirmDeleteButton>
          ),
        },
      ]}
    />
  );
};

export { MediaTable };
