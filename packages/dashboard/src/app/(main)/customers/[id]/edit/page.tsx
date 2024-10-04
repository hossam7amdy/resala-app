import { EditForm } from '@/features/customers';
import { getUserById } from '@/fetch/users';
import type { Params } from '@/types';
import { notFound } from 'next/navigation';

const EditCustomerPage = async ({ params }: { params: Params }) => {
  const user = await getUserById(params.id);

  if (!user) {
    notFound();
  }

  return <EditForm customer={user} />;
};

export default EditCustomerPage;
