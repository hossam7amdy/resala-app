'use client';

import { logout } from '@/actions/auth';
import ROUTES from '@/utils/routes';
import { LogoutOutlined } from '@ant-design/icons';
import { Flex, Grid } from 'antd';
import Link from 'next/link';

import { Logo, Menu, NavLinks } from '.';

export const SideNav: React.FC = () => {
  const { lg } = Grid.useBreakpoint();

  return (
    <Flex vertical style={{ height: '100%' }}>
      <Link href={ROUTES.DASHBOARD}>
        <div style={{ textAlign: 'center', margin: '50px auto' }}>
          <Logo width={!lg ? 58 : undefined} height={!lg ? 30 : undefined} />
        </div>
      </Link>
      <div style={{ flex: 1 }}>
        <NavLinks />
      </div>
      <div style={{ marginBottom: 20 }}>
        <Menu
          items={[
            {
              danger: true,
              key: 'logout',
              icon: <LogoutOutlined />,
              label: 'Logout',
              onClick: () => logout(),
            },
          ]}
        />
      </div>
    </Flex>
  );
};
