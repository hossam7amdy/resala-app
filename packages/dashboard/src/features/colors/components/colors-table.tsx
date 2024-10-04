'use client';

import { PopconfirmDeleteButton, Table } from '@/components';
import { StockColor } from '@/features/stocks';
import { deleteColor } from '@/fetch/colors';
import { formatDate } from '@/utils/date-time-formatter';
import { EditOutlined } from '@ant-design/icons';
import type { ListColorsResponse } from '@resala/shared';
import { Space } from 'antd';

import { ColorEditorModal } from './color-editor-modal';

export const ColorsTable: React.FC<{ colors: ListColorsResponse['data'] }> = ({ colors }) => {
  return (
    <Table
      pagination={{
        pageSize: 10,
        total: colors.length,
        position: ['bottomCenter'],
      }}
      rowKey="id"
      columns={[
        { title: 'Color', dataIndex: 'code', key: 'code' },
        { title: 'English Name', dataIndex: 'enName', key: 'enName' },
        { title: 'Arabic Name', dataIndex: 'arName', key: 'arName' },
        { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
        { title: 'Actions', dataIndex: 'actions', key: 'actions' },
      ]}
      dataSource={colors.map(color => ({
        ...color,
        actions: (
          <Space>
            <ColorEditorModal color={color} buttonProps={{ type: 'link' }}>
              <EditOutlined />
            </ColorEditorModal>
            <PopconfirmDeleteButton onConfirmDelete={() => deleteColor(color.id)} />
          </Space>
        ),
        createdAt: formatDate(color.createdAt),
        code: <StockColor color={color.code} />,
      }))}
    />
  );
};
