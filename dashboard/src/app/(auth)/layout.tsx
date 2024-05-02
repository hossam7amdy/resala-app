import styles from './layout.module.css';

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <main className={styles.main}>{children}</main>;
};

export default RootLayout;
