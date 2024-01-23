import CategoriesList from "./components/CategoriesList";
import Post from "./components/Post";
import { TPost } from "./types";

const getPosts = async (): Promise<TPost[] | null> => {
  try {
    const res = await fetch(`${process.env.API_URL_BASE}/api/posts`, { cache: 'no-store'})
    
    if (res.ok) {
      const posts = await res.json();
      return posts;
    }

  } catch (error) {
    console.log(error);
  }

  return null
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <CategoriesList />
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            authorEmail={post.authorEmail}
            author={post.author.name}
            createdAt={post.createdAt}
            category={post.catName}
            links={post.links || []}
            thumbnail={post.imageUrl}
          />
        ))
      ) : (
        <div className="py-6">No Posts to Display</div>
      )}
    </>
  );
}
