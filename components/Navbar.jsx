'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import avatar1 from '@/public/img/avatar1.jpg';
import { AiOutlineClose } from 'react-icons/ai';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const pathname = usePathname();
  const loggedIn = false;
  const handleShowDropdown = () => setShowDropdown((prev) => true);
  const handleHideDropdown = () => setShowDropdown((prev) => false);
  return (
    <div className="container py-2 h-16 flex items-center justify-between">
      <Link href={'/'}>
        DeerIT <span className="special-word">blog.</span>
      </Link>

      <ul className="flex items-center gap-3">
        <li>
          <Link
            href={'/blog'}
            className={
              pathname === '/blog' ? 'text-primaryColor font-bold' : ''
            }
          >
            Blog
          </Link>
        </li>
        {loggedIn ? (
          <>
            <li>
              <Link
                href={'/create-blog'}
                className={
                  pathname === '/create-blog'
                    ? 'text-primaryColor font-bold'
                    : ''
                }
              >
                Create
              </Link>
            </li>
            <li>
              <Link
                href={'/user'}
                className={
                  pathname === '/user' ? 'text-primaryColor font-bold' : ''
                }
              >
                <div className="relative">
                  <Image
                    onClick={handleShowDropdown}
                    src={avatar1}
                    alt="avatar"
                    sizes="100vw"
                    className="w-10 h-10 rounded-full cursor-pointer"
                  />
                  {showDropdown && (
                    <div className="absolute top-9 right-0  bg-primaryColorLight p-5 text-primaryColor rounded-2xl">
                      <AiOutlineClose
                        onClick={handleHideDropdown}
                        className="relative w-full cursor-pointer left-8 -top-3 "
                      />
                      <button
                        onClick={handleHideDropdown}
                        className="relative right-3 mb-3 "
                      >
                        Logout
                      </button>
                      <Link
                        onClick={handleHideDropdown}
                        href={'/user'}
                        className="relative right-3 mt-3 "
                      >
                        Profile
                      </Link>
                    </div>
                  )}
                </div>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                href={'/login'}
                className={
                  pathname === '/login' ? 'text-primaryColor font-bold' : ''
                }
              >
                Log In
              </Link>
            </li>
            <li>
              <Link
                href={'/signup'}
                className={
                  pathname === '/signup' ? 'text-primaryColor font-bold' : ''
                }
              >
                Sign Up{' '}
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
