import { deleteColor } from '@/actions/color';
import ROUTES from '@/lib/routes';
import { formatDate } from '@/lib/util';
import { EditFilled } from '@ant-design/icons';
import type { GetColorsListResponse } from '@resala/shared';
import { Table as AntTable, Space } from 'antd';
import Link from 'next/link';

import DeleteButton from '../ui/delete-button';
import StockColor from '../ui/stock-color';

const List = ({ colors }: { colors: GetColorsListResponse['data'] }) => {
  return (
    <AntTable
      pagination={{
        current: 1,
        pageSize: 10,
        total: colors.length,
        position: ['bottomCenter'],
      }}
      scroll={{ x: 768, y: 500 }}
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
            <Link href={ROUTES.EDIT_COLOR(color.id)}>
              <EditFilled />
            </Link>
            <DeleteButton deleteAction={deleteColor.bind(null, color.id)} />
          </Space>
        ),
        createdAt: formatDate(color.createdAt),
        code: <StockColor color={color.code} />,
      }))}
    />
  );
};

export default List;
