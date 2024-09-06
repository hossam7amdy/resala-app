import { ROUTES } from '@/utils/routes';
import { Header as AntHeader } from 'antd/es/layout/layout';
import Link from 'next/link';

import { Logo } from '../logo';
import { MobileDrawer } from '../mobile-drawer';

export const Header: React.FC = () => {
  return (
    <AntHeader className="bg-inherit flex items-center justify-between shadow-md p-4 sm:p-8 sm:hidden">
      <MobileDrawer />

      <Link href={ROUTES.DASHBOARD} className="h-full">
        <Logo className="w-[90px] h-auto" />
      </Link>
    </AntHeader>
  );
};
