import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EditPostForm from "@/app/components/EditPostForm";
import { TPost } from "@/app/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const getPost = async (id: string): Promise<TPost | null> => {
  try {
    const res = await fetch(`${process.env.API_URL_BASE}/api/posts/${id}`, {
      method: "GET",
      cache: "no-store"
    });

    if (res.ok) {
      const post = await res.json();
      return post;
    }

  } catch (error) {
    console.log(error)
  }

  return null;
}

async function EditPost({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if(!session) {
    redirect('/sign-in')
  }

  const id = params.id;
  const post = await getPost(id);

  return (
    <>
      {
        post ? (
          <EditPostForm post={post} />
        ) : (
          <h1><p className="error">Invalid Post</p></h1>
        )
      }
    </>
  );
}

export default EditPost;