import { listUsers } from '@/actions/users';
import { CustomersTable } from '@/features/customers';
import type { ListUsersRequest } from '@resala/shared';

const CustomerPage = async (props: { searchParams?: Promise<ListUsersRequest['query']> }) => {
  const searchParams = await props.searchParams;
  const data = await listUsers(searchParams);

  return <CustomersTable data={data} />;
};

export default CustomerPage;
