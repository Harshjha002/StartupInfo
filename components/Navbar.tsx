import { auth, signIn, signOut } from '@/auth';

import Link from 'next/link';
import React from 'react';

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="bg-gray-800 text-white shadow-lg">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href={'/'}>
          <h1 className="text-2xl font-bold cursor-pointer">
            Startup<span className="text-blue-500">Info</span>
          </h1>
        </Link>

        <div className="flex items-center gap-5">
          {session && session?.user ? (
            <>
              <Link href={'/startup/create'}>
                <span className="text-sm font-medium text-blue-500 hover:underline">
                  Create
                </span>
              </Link>
              <form
                action={async () => {
                  'use server';
                  await signOut({ redirectTo: '/' });
                }}
              >
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-500 text-sm text-white rounded hover:bg-red-600"
                >
                  Log out
                </button>
              </form>
              <Link href={`/user/${session?.id}`}>
                <span className="text-sm font-medium text-white hover:underline">
                  {session?.user?.name}
                </span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                'use server';
                await signIn('github');
              }}
            >
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-sm text-white rounded hover:bg-blue-600"
              >
                Log in
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
