import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";

type PostsProps = {
  id: string;
  title: string;
  content: string;
  authorEmail: string;
  author: string;
  createdAt: string;
  category?: string;
  links?: null | string[];
  thumbnail?: string;
};

async function Post({
  id,
  title,
  content,
  authorEmail,
  author,
  createdAt,
  category,
  links,
  thumbnail,
}: PostsProps) {
  const session = await getServerSession(authOptions);

 const isEditable = session && session.user?.email === authorEmail;

 const dateObject = new Date(createdAt);
 const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };

 const formatedDate = dateObject.toLocaleDateString('en-US', options)

  return (
    <div className="my-4 border-b border-b-300 py-8">
      <div className="mb-4">
        {author ? (
          <>
            Posted by: <span className="font-bold">{author}</span> on{" "}
            {formatedDate}
          </>
        ) : (
          <>
            Posted on {formatedDate}
          </>
        )}
      </div>
      <div className="w-full h-72 relative mb-4">
        {thumbnail ? (
          <Image
            className="w-full h-full object-cover rounded-md object-center"
            src={thumbnail}
            alt={title}
            fill
          />
        ) : (
          <Image
            className="w-full h-full object-cover rounded-md object-center"
            src={"/thumbnail-placeholder.png"}
            alt={title}
            fill
          />
        )}
      </div>

      {category && (
        <Link
          className="bg-darkBlue w-fit text-white px-4 py-1 text-sm font-bold rounded-sm mt-4"
          href={`/categories/${category}`}
        >
          {category}
        </Link>
      )}

      <h2>{title}</h2>
      <p>{content}</p>

      {links!.length > 0 && (
        <div className="my-4 flex flex-col gap-3">
          {links!.map((link, i) => (
            <div key={i} className="flex gap-3 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                />
              </svg>
              <Link className="link" href={link}>
                {link}
              </Link>
            </div>
          ))}
        </div>
      )}

      {isEditable && (
        <div className="flex gap-3 font-bold mt-4">
          <Link
            className="border dark:border-slate-600 rounded-md p-1.5 dark:hover:bg-slate-50/25 hover:bg-slate-400/25 duration-500"
            href={`/edit-post/${id}`}
          >
            Edit
          </Link>
          <DeleteButton postId={id} />
        </div>
      )}
    </div>
  );
}

export default Post;