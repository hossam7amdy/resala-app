import { Select, type SelectProps } from 'antd';

import { StockColor } from '../..';

interface SelectColorProps extends SelectProps {
  colors: {
    id: string;
    code: string;
    enName: string;
    arName: string;
    disabled?: boolean;
  }[];
}
export const SelectColor: React.FC<SelectColorProps> = ({ colors, ...props }) => {
  return (
    <Select
      allowClear
      showSearch
      placeholder="Select color"
      options={colors.map(c => ({
        value: c.id,
        disabled: c.disabled,
        label: (
          <span>
            <StockColor color={c.code} /> {c.enName} | {c.arName}
          </span>
        ),
      }))}
      {...props}
    />
  );
};
