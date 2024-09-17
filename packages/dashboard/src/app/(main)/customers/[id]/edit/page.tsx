import { EditForm } from '@/features/customers';
import { getUserById } from '@/fetch/users';
import { notFound } from 'next/navigation';

const EditCustomerPage = async ({ params }: { params: { id: string } }) => {
  const user = await getUserById(params.id);

  if (!user) {
    notFound();
  }

  return <EditForm customer={user} />;
};

export default EditCustomerPage;
