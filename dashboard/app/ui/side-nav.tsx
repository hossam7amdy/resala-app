import { signOut } from '@/auth';
import { PoweroffOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import Link from 'next/link';

import { Logo } from './logo';
import { NavLinks } from './nav-links/nav-links';

export const SideNav = () => {
  return (
    <Flex vertical style={{ height: '100%' }}>
      <Link href="/dashboard">
        <div style={{ textAlign: 'center', margin: '50px auto' }}>
          <Logo />
        </div>
      </Link>
      <div style={{ flex: 1 }}>
        <NavLinks />
      </div>
      <div style={{ alignSelf: 'center', marginBottom: 20 }}>
        <form
          action={async () => {
            'use server';
            await signOut({ redirect: true, redirectTo: '/' });
          }}
        >
          <Button htmlType="submit" icon={<PoweroffOutlined />}>
            Logout
          </Button>
        </form>
      </div>
    </Flex>
  );
};
