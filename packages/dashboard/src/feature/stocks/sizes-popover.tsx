import type { Size } from '@resala/shared';
import { Popover } from 'antd';

export const SizesPopover: React.FC<{ sizes: Size[] }> = ({ sizes }) => {
  return (
    <Popover
      trigger={['hover', 'click']}
      // content={<List dataSource={sizes} renderItem={size => <List.Item>{size.name}</List.Item>} />}
    >
      {sizes.length}
    </Popover>
  );
};
