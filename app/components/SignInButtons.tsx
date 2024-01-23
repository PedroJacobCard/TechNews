'use client'

import Image from "next/image";
import { DiGithubBadge } from "react-icons/di";

import { signIn } from "next-auth/react";



function SignInButtons() {

  const handleSignIn = async (provider: string) => {
    const result = await signIn(provider, {
      callbackUrl: process.env.NEXT_PUBLIC_CALLBACK
    });

    if (result?.error) {
      alert(
        `There is an error during the registering: ${result.error}`
      );
    }
    return result;
  }

  return (
    <>
      <h1 className="text-center mt-8 font-semibold">Sign In</h1>
      <div className="mt-4 p-4 flex flex-col items-center justify-center gap-4">
        <button onClick={() => handleSignIn('github')}
          className="flex items-center border p-2 pr-3 rounded-full dark:hover:bg-slate-50/25 hover:bg-slate-400/25 duration-500"
        >
          <span>
            <DiGithubBadge className="size-8 sm:size-11 mr-1" />
          </span>
          Sign In with Github
        </button>
        <button onClick={() => handleSignIn('google')}
          className="flex items-center border p-3 rounded-full dark:hover:bg-slate-50/25 hover:bg-slate-400/25 duration-500"
        >
          <span>
            <Image
              src={"/Google.svg"}
              width={30}
              height={30}
              alt="google logo"
              className="size-6 sm:size-8 pb-1 mr-2"
            />
          </span>
          Sign In with Google
        </button>
      </div>
    </>
  );
}

export default SignInButtons;