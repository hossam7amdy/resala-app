import { getUserById } from '@/data/user';
import { EditForm } from '@/features/customers';
import { notFound } from 'next/navigation';

const EditCustomerPage = async ({ params }: { params: { id: string } }) => {
  const user = await getUserById(params.id);

  console.log(user);

  if (!user) {
    notFound();
  }

  return <EditForm customer={user} />;
};

export default EditCustomerPage;
