import { auth, signIn, signOut } from '@/auth';
import Link from 'next/link';
import React from 'react';

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="bg-secondary text-white shadow-lg">
      <nav className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href={'/'}>
          <h1 className="text-2xl font-bold cursor-pointer">
            Startup<span className="text-primary">Info</span>
          </h1>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-5">
          {session && session?.user ? (
            <>
              <Link href={'/startup/create'}>
                <span
                  className="text-sm font-medium text-primary hover:underline"
                  aria-label="Create a new startup"
                >
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
                  aria-label="Log out"
                >
                  Log out
                </button>
              </form>
              <Link href={`/user/${session?.id}`}>
                <span
                  className="text-sm font-medium text-white hover:underline"
                  aria-label="User profile"
                >
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
                className="px-4 py-2 bg-primary text-sm text-white rounded hover:bg-primary-200"
                aria-label="Log in with GitHub"
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
