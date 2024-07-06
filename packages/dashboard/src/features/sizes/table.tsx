import { deleteSize } from '@/actions/size';
import ROUTES from '@/lib/routes';
import { formatDate } from '@/lib/util';
import { EditFilled } from '@ant-design/icons';
import type { GetSizesListResponse } from '@resala/shared';
import { Table as AntTable, Space } from 'antd';
import Link from 'next/link';

import DeleteButton from '../../components/delete-button';

const Table = ({ sizes }: { sizes: GetSizesListResponse['data'] }) => {
  return (
    <AntTable
      pagination={{
        current: 1,
        pageSize: 10,
        total: sizes.length,
        position: ['bottomCenter'],
      }}
      scroll={{ x: true, y: 500 }}
      rowKey="id"
      columns={[
        { title: 'Size', dataIndex: 'name', key: 'name' },
        { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
        { title: 'Actions', dataIndex: 'actions', key: 'actions' },
      ]}
      dataSource={sizes.map(size => ({
        ...size,
        actions: (
          <Space>
            <Link href={ROUTES.EDIT_SIZE(size.id)}>
              <EditFilled />
            </Link>
            <DeleteButton deleteAction={deleteSize.bind(null, size.id)} />
          </Space>
        ),
        createdAt: formatDate(size.createdAt),
      }))}
    />
  );
};

export default Table;
