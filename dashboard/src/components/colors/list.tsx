'use client';

import { deleteColor } from '@/actions/color';
import ROUTES from '@/lib/routes';
import { formatDate } from '@/lib/util';
import { EditFilled } from '@ant-design/icons';
import type { GetColorsListResponse } from '@resala/shared';
import { List as AntList, Space } from 'antd';
import ListItem, { Meta as ListMeta } from 'antd/lib/list/Item';
import Link from 'next/link';

import DeleteButton from '../ui/delete-button';
import StockColor from '../ui/stock-color';

const List = ({ colors }: { colors: GetColorsListResponse['data'] }) => {
  return (
    <AntList
      size="small"
      itemLayout="vertical"
      dataSource={colors}
      renderItem={color => (
        <ListItem
          key={color.id}
          extra={[
            <Space key="actions">
              <Link href={ROUTES.EDIT_COLOR(color.id)}>
                <EditFilled />
              </Link>
              <DeleteButton deleteAction={deleteColor.bind(null, color.id)} />
            </Space>,
          ]}
        >
          <ListMeta
            avatar={<StockColor color={color.code} />}
            title={`${color.enName} | ${color.arName}`}
            description={formatDate(color.createdAt)}
          />
        </ListItem>
      )}
    />
  );
};

export default List;
