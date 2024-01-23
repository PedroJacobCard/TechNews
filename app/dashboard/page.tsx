import Post from "../components/Post";
import Link from "next/link";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/utils/authOptions";
import { redirect } from "next/navigation";
import { TPost } from "../types";

const getPosts = async (email: string) => {
  try {
    const res = await fetch(`${process.env.API_URL_BASE}/api/authors/${email}`);
    const { posts } = await res.json()
    return posts;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function Dashboard() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  let posts = [];

  if (!session) {
    return redirect("/sign-in");
  }

  if (email) {
    posts = await getPosts(email);
  }

  return (
    <div>
      <h1>My Posts</h1>

      {posts && posts.length > 0 ? (
        posts.map((post: TPost) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            authorEmail={post.authorEmail}
            author={session.user?.name ? 'You' : ''}
            createdAt={post.createdAt}
            category={post.catName}
            links={post.links || []}
            thumbnail={post.imageUrl}
          />
        ))
      ) : (
        <div className="py-6">
          No Posts created yet. Start creating!{" "}
          <Link className="border-b border-blue-700" href={"/create-post"}>
            Create Post
          </Link>
        </div>
      )}
    </div>
  );
}

export default Dashboard;