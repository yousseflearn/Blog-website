import Input from '@/components/Input';
import Link from 'next/link';
const SignUpForm = () => {
  return (
    <section className="container">
      <form className="border-2 border-paragraphColor rounded-lg max-w-sm mx-auto px-8 py-6 space-y-5">
        <h2 className="text-center special-word">Sign Up</h2>
        <Input label="Name" type="text" name="name" />
        <Input label="Email" type="email" name="email" />
        <Input label="Password" type="password" name="password" />
        <button type="submit" className="btn w-full">
          Sign Up
        </button>
        <p>
          Already a user?{' '}
          <Link href={'/login'} className="text-primaryColor">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};

export default SignUpForm;
