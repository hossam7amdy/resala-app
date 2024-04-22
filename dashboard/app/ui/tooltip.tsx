import { Tooltip } from 'antd';
import type { TooltipProps } from 'antd';
import React from 'react';

const ResalaTooltip = (props: TooltipProps): JSX.Element => {
  const { children, ...rest } = props;

  return (
    <Tooltip destroyTooltipOnHide={{ keepParent: false }} mouseLeaveDelay={0} {...rest}>
      {children}
    </Tooltip>
  );
};

export default ResalaTooltip;
