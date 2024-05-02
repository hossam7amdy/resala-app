import { Breadcrumb } from 'antd';
import type { Metadata } from 'next';

import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Dashboard',
};

const DashboardPage = () => {
  return (
    <div className={styles.page}>
      <Breadcrumb items={[{ title: 'Dashboard' }]} />
      <br />
    </div>
  );
};

export default DashboardPage;
