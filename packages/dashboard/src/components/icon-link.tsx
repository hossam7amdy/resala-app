import { SelectOutlined } from '@ant-design/icons';
import Link from 'next/link';
import type { LinkProps } from 'next/link';
import React from 'react';

interface IconLinkProps extends LinkProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
}
export const IconLink: React.FC<IconLinkProps> = ({ children, icon, ...props }) => {
  return (
    <Link {...props}>
      {children} {icon ?? <SelectOutlined className="rotate-90" />}
    </Link>
  );
};
