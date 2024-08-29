import { listUsers } from '@/data/user';
import { CustomersTable } from '@/features/customers';
import type { ListUsersRequest } from '@resala/shared';

const CustomerPage = async ({ searchParams }: { searchParams?: ListUsersRequest['query'] }) => {
  const { users, pagination } = await listUsers(searchParams ?? {});

  return <CustomersTable users={users} pagination={pagination} />;
};

export default CustomerPage;
