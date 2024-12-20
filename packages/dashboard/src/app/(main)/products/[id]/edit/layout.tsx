import type { Params } from '@/types';

interface EditProductPageProps {
  params: Params;
  children: React.ReactNode;
}
const EditProductLayout: React.FC<EditProductPageProps> = ({ children }) => {
  return <>{children}</>;
};

export default EditProductLayout;
