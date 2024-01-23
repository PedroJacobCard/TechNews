'use client'

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";

function NavBar() {
  const { status, data: session } = useSession();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsPopupVisible(false)
      }
    };

    document.addEventListener('click', handleClickOutside);

    if (!isPopupVisible) {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, [isPopupVisible])

  return (
    <div className="flex items-center justify-between pb-4 border-b mb-4 relative">
      <div>
        <Link href={"/"}>
          <h1 className="text-4xl font-bold tracking-tighter text-darkBlue">
            TechNews
          </h1>
        </Link>
        <p className="text-sm">
          Exploring Tomorrow&apos;s Inovations,
          <br /> One Byte at a Time.
        </p>
      </div>

      {status === "authenticated" ? (
        <>
          <div
            ref={popupRef}
            className={`absolute z-30 right-0 top-20 bg-white dark:bg-slate-400/90 p-6 shadow-lg dark:shadow-md dark:shadow-darkBlue rounded-sm flex flex-col gap-2 text-right min-w-[160px] ${
              isPopupVisible ? "flex" : "hidden"
            }`}
          >
            <div className="font-semibold">{session.user?.name}</div>
            <div className="font-semibold">{session.user?.email}</div>
            <Link
              className="hover:bg-slate-200 dark:hover:bg-slate-500 duration-500 rounded-sm"
              onClick={() => setIsPopupVisible(false)}
              href={"/dashboard"}
            >
              Dashboard
            </Link>
            <Link
              className="hover:bg-slate-200 dark:hover:bg-slate-500 duration-500 rounded-sm"
              onClick={() => setIsPopupVisible(false)}
              href={"/create-post"}
            >
              Create Post
            </Link>
            <button onClick={() => signOut()} className="btn">
              Sign Out
            </button>
          </div>
          <div className="flex gap-2 items-center">
            <Link
              className="hidden md:flex gap-2 items-center mr-6"
              href={"/create-post"}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </span>
              <span>Create New</span>
            </Link>
            <Image
              src={session.user?.image || ""}
              width={38}
              height={38}
              alt="User Image"
              className="rounded-full cursor-pointer"
              onClick={() => setIsPopupVisible(!isPopupVisible)}
            />
          </div>
        </>
      ) : (
        <div className="flex items-center">
          <Link className="btn" href={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
}

export default NavBar;