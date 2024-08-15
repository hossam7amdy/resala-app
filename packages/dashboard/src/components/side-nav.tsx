import { logout } from '@/actions/auth';
import { ROUTES } from '@/utils/routes';
import { LogoutOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import Link from 'next/link';

import { Logo, Menu, NavLinks } from '.';

export const SideNav: React.FC = () => {
  return (
    <Flex vertical style={{ height: '100%' }}>
      <Link href={ROUTES.DASHBOARD}>
        <div style={{ textAlign: 'center', margin: '50px auto' }}>
          <Logo className="side-nav-logo" />
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
              label: (
                <form action={logout}>
                  <Button
                    danger
                    type="link"
                    htmlType="submit"
                    style={{ padding: 0, fontWeight: 'inherit' }}
                  >
                    Logout
                  </Button>
                </form>
              ),
            },
          ]}
        />
      </div>
    </Flex>
  );
};
