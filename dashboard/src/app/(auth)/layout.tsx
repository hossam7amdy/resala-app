import type { Metadata } from 'next';

import styles from './layout.module.css';

export const metadata: Metadata = {
  title: {
    default: 'Resala - Admin Dashboard',
    template: '%s | Resala',
  },
  description: 'Resala Admin Dashboard for store management.',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <main className={styles.main}>{children}</main>;
};

export default RootLayout;
