import CreatePostForm from "../components/CreatePostForm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/utils/authOptions";
import { redirect } from "next/navigation";

async function CreatePost() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/sign-in");
  }

  return ( 
    <CreatePostForm />
   );
}

export default CreatePost;