import { NavLinks, ResalaLogo, UserDropdown } from '@/components';
import { ROUTES } from '@/routes';
import { Flex } from 'antd';
import Link from 'next/link';

export const SideNav: React.FC = () => {
  return (
    <Flex vertical style={{ height: '100%' }}>
      <Link href={ROUTES.DASHBOARD}>
        <div style={{ textAlign: 'center', margin: '50px auto' }}>
          <ResalaLogo className="h-[30px] w-[55px] lg:h-full lg:w-[116px]" />
        </div>
      </Link>
      <div style={{ flex: 1 }}>
        <NavLinks />
      </div>
      <div style={{ marginBottom: 20 }}>
        <UserDropdown />
      </div>
    </Flex>
  );
};
