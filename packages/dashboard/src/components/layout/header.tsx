import { ROUTES } from '@/routes';
import { Header as AntHeader } from 'antd/es/layout/layout';
import Link from 'next/link';

import { ResalaLogo } from '../ResalaLogo';
import { MobileDrawer } from '../mobile-drawer';

export const Header: React.FC = () => {
  return (
    <AntHeader className="bg-inherit sticky z-10 w-full top-0 flex items-center justify-between shadow-md p-4 sm:p-8 sm:hidden">
      <MobileDrawer />

      <Link href={ROUTES.DASHBOARD} className="h-full">
        <ResalaLogo className="w-[90px] h-auto" />
      </Link>
    </AntHeader>
  );
};
