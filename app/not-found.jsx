import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="container h-screen flex flex-col gap-5 justify-center items-center">
      <h2>Not found</h2>
      <p>Could not find requested resource</p>
      <Link href={'/home'}>Return Home</Link>
    </div>
  );
};

export default NotFound;
