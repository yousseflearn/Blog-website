import SignUpForm from '@/components/SignUpForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

const SignUp = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/blog');
  }
  return (
    <div>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
