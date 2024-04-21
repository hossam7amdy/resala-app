'use client';

import 'next-auth';
import { useSession } from 'next-auth/react';

export default function page() {
  // access session
  const session = useSession();

  console.log(session);

  return (
    <main>
      <h1>Dashboard Page</h1>
    </main>
  );
}
