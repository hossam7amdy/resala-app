import { listUsersPaginated } from '@/data/user';
import { CustomersTable } from '@/features/customers';

const CustomerPage = async ({
  searchParams,
}: {
  searchParams?: { page?: string; limit?: string; query?: string };
}) => {
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;
  const query = searchParams?.query || '';

  const { users, pagination } = await listUsersPaginated({ page, limit, query });

  return <CustomersTable users={users} pagination={pagination} />;
};

export default CustomerPage;
