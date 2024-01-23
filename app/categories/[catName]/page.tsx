import Post from "@/app/components/Post";
import { TPost } from "@/app/types";

const getPosts = async (catName: string): Promise<TPost[] | null> => {
  try {
    const res = await fetch(`${process.env.API_URL_BASE}/api/categories/${catName}`, { cache: "no-store" })

    if (res.ok) {
      const categories = await res.json()
      const posts = categories.posts;
      return posts;
    }
  } catch (error) {
    console.log(error)
  }

  return null;
}

async function CategoryPosts({ params }: { params: { catName: string } }) {
  const category = params.catName;
  const posts = await getPosts(category)
  return (
    <>
      <h1>
        <span className="font-normal">
          Posts for the category {<span className="font-bold">{decodeURIComponent(category)}</span>}
          
        </span>
      </h1>
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

export default CategoryPosts;