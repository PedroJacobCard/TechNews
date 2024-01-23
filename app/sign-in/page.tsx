import SignInButtons from "../components/SignInButtons";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

async function SignInPage() {
  const session = await getServerSession(authOptions)

  if (session?.user) {
    return redirect("/dashboard")
  }
  
  return (
    <SignInButtons />
   );
}

export default SignInPage;