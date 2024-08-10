import { deleteImage, setDefaultImage } from '@/actions/image';
import { ResalaTooltip } from '@/components';
import { DeleteOutlined, LoadingOutlined, MoreOutlined, PushpinOutlined } from '@ant-design/icons';
import type { Image } from '@resala/shared';
import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import React from 'react';

export const MoreMenu: React.FC<{ image: Omit<Image, 'colorId'> }> = ({ image }) => {
  const [loading, setLoading] = React.useState<'primary' | 'delete' | undefined>();

  const items: MenuProps['items'] = [
    {
      key: 'primary',
      label: 'Make primary',
      disabled: image.isPrimary || loading === 'primary',
      icon: loading === 'primary' ? <LoadingOutlined /> : <PushpinOutlined />,
      onClick: async () => {
        try {
          setLoading('primary');
          await setDefaultImage(image.id.toString(), image.productId.toString());
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(undefined);
        }
      },
    },
    {
      key: 'delete',
      label: 'Delete',
      danger: true,
      disabled: loading === 'delete',
      icon: loading === 'delete' ? <LoadingOutlined /> : <DeleteOutlined />,
      onClick: async () => {
        try {
          setLoading('delete');
          await deleteImage(image.id.toString(), image.productId.toString());
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(undefined);
        }
      },
    },
  ];

  return (
    <Dropdown
      open={loading === 'primary' || loading === 'delete' ? true : undefined}
      trigger={['click']}
      menu={{ items }}
    >
      <ResalaTooltip title="More">
        <Button type="link" size="large" icon={<MoreOutlined />} />
      </ResalaTooltip>
    </Dropdown>
  );
};
