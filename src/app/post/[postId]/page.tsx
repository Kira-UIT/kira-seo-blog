"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";

export default function PostDetail({ params }: { params: { postId: string } }) {
  const { user } = useUser();
  const router = useRouter();
  // const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [post, setPost] = useState<any>(null);

  // const { deletePost } = useContext(PostsContext);

  // const handleDeleteConfirm = async () => {
  //   try {
  //     const response = await fetch(`/api/deletePost`, {
  //       method: 'POST',
  //       headers: {
  //         'content-type': 'application/json',
  //       },
  //       body: JSON.stringify({ postId: props.id }),
  //     });
  //     const json = await response.json();
  //     if (json.success) {
  //       deletePost(props.id);
  //       router.replace(`/post/new`);
  //     }
  //   } catch (e) {}
  // };

  useLayoutEffect(() => {
    if (params.postId) {
      const getPostDetailHandler = async () => {
        try {
          const response = await fetch(`/api/posts/${params.postId}`).then(
            (res) => res.json()
          );
          setPost(response);
        } catch (error) {}
      };
      getPostDetailHandler();
    }
  }, [params.postId]);

  return (
    <div className="h-full">
      <div className="max-w-screen-lg mx-auto px-6">
        <div className="text-sm font-bold p-2 bg-stone-200 rounded-sm">
          SEO title and meta description
        </div>
        <div className="p-4 my-2 border border-stone-200 rounded-md">
          <div className="text-blue-600 text-2xl font-bold">{post?.title}</div>
          <div className="mt-2 text-gray-400">{post?.description}</div>
        </div>
        <div className="text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm">
          Keywords
        </div>
        {/* <div className="flex flex-wrap pt-2 gap-1">
          {post?.keywords.split(",").map((keyword, i) => (
            <div key={i} className="p-2 rounded-full bg-slate-800 text-white">
              <FontAwesomeIcon icon={faHashtag} /> {keyword}
            </div>
          ))}
        </div> */}
        <div className="text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm">
          Blog post
        </div>
        <div dangerouslySetInnerHTML={{ __html: post?.content || "" }} />
        {/* <div className="my-4">
          {!showDeleteConfirm && (
            <button
              className="btn bg-red-600 hover:bg-red-700"
              onClick={() => setShowDeleteConfirm(true)}
            >
              Delete post
            </button>
          )}
          {!!showDeleteConfirm && (
            <div>
              <p className="p-2 bg-red-300 text-center">
                Are you sure you want to delete this post? This action is
                irreversible
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="btn bg-stone-600 hover:bg-stone-700"
                >
                  cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="btn bg-red-600 hover:bg-red-700"
                >
                  confirm delete
                </button>
              </div>
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
}
