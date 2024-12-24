'use client';

import { Select, type SelectProps } from 'antd';

interface SelectSizeProps extends SelectProps {
  sizes: {
    id: string;
    name: string;
    disabled?: boolean;
  }[];
}
const SelectSize: React.FC<SelectSizeProps> = ({ sizes, ...props }) => {
  return (
    <Select
      allowClear
      showSearch
      placeholder="Select Size"
      options={sizes.map(s => ({
        label: s.name,
        value: s.id,
        disabled: s.disabled,
      }))}
      {...props}
    />
  );
};

export { SelectSize };
