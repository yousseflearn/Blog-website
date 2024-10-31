'use client';
import { useState, useEffect } from 'react';
import Input from '@/components/Input';
import Link from 'next/link';
const LoginForm = () => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }
  return (
    <section className="container">
      <form className="border-2 border-paragraphColor rounded-lg max-w-sm mx-auto px-8 py-6 space-y-5">
        <h2 className="text-center special-word">Login</h2>
        <Input label="Email" type="email" name="email" />
        <Input label="Password" type="password" name="password" />
        <button type="submit" className="btn w-full">
          Login
        </button>
        <p className="text-center">
          Need an account ?{' '}
          <Link href={'/signup'} className="text-primaryColor">
            Sign Up
          </Link>
        </p>
      </form>
    </section>
  );
};

export default LoginForm;
