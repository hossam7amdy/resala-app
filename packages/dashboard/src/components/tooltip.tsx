import { Tooltip } from 'antd';
import type { TooltipProps } from 'antd';
import React from 'react';

const ResalaTooltip: React.FC<TooltipProps> = props => {
  const { children, ...rest } = props;

  return (
    <Tooltip destroyTooltipOnHide={true} mouseLeaveDelay={0} {...rest}>
      {children}
    </Tooltip>
  );
};

export default ResalaTooltip;
