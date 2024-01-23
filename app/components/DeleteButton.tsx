'use client'

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function DeleteButton({ postId }: { postId: string }) {
  const route = useRouter();

  const deleteImage = async (publicId: string) => {
    await fetch(`/api/removeImage`, {
      method: `POST`,
      headers: {
        "Content-Type": `application/json`,
      },
      body: JSON.stringify({ publicId })
    });
  }

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you shure you want to delete this post?")

    if (confirmed) {
      try {
        const res = await fetch(`/api/posts/${postId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (res.ok) {
          const post = await res.json();
          const { publicId } = post;
          await deleteImage(publicId);
          route.refresh();
          toast.success("Post successfully deleted.")
        }

      } catch (error) {
        toast.error("Something went wrong. Please, try again.");
      }
    }
  }
  return (
    <button onClick={handleDelete} className="text-red-600 border dark:border-slate-600 rounded-md p-1 dark:hover:bg-slate-50/25 hover:bg-slate-400/25 duration-500">
      Delete
    </button>
  );
}

export default DeleteButton;