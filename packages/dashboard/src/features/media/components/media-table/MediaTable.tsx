'use client';

import { deleteMedia } from '@/actions/media';
import { Image, PopconfirmDeleteButton, Table } from '@/components';
import { formatDate } from '@/utils/date-time-formatter';
import { formatBytes } from '@/utils/formatBytes';
import type { Media } from '@resala/shared';
import React from 'react';

import { FilenameCell } from './FilenameCell';

interface MediaTableProps {
  medias: Media[];
}
const MediaTable: React.FC<MediaTableProps> = ({ medias }) => {
  return (
    <Table
      rowHoverable
      rowClassName={() => 'cursor-pointer'}
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
              style={{ width: 50, height: 75, objectFit: 'cover' }}
            />
          ),
        },
        {
          align: 'left',
          title: 'File name',
          dataIndex: 'filename',
          key: 'filename',
          minWidth: 200,
          render: (_, media) => <FilenameCell media={media} />,
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
          dataIndex: 'updatedAt',
          key: 'updatedAt',
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
