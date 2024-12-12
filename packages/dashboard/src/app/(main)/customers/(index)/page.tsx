import { CustomersTable } from '@/features/customers';
import { listUsers } from '@/fetch/users';
import type { ListUsersRequest } from '@resala/shared';

const CustomerPage = async ({ searchParams }: { searchParams?: ListUsersRequest['query'] }) => {
  const data = await listUsers(searchParams);

  return <CustomersTable data={data} />;
};

export default CustomerPage;
