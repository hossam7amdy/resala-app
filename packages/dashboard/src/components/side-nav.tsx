import { logout } from '@/actions/auth';
import ROUTES from '@/lib/routes';
import { LogoutOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import Link from 'next/link';

import { Logo, NavLinks } from '.';

const SideNav: React.FC = () => {
  return (
    <Flex vertical style={{ height: '100%' }}>
      <Link href={ROUTES.DASHBOARD}>
        <div style={{ textAlign: 'center', margin: '50px auto' }}>
          <Logo />
        </div>
      </Link>
      <div style={{ flex: 1 }}>
        <NavLinks />
      </div>
      <div style={{ alignSelf: 'center', marginBottom: 20 }}>
        <form action={logout}>
          <Button htmlType="submit" icon={<LogoutOutlined />}>
            Logout
          </Button>
        </form>
      </div>
    </Flex>
  );
};

export default SideNav;
