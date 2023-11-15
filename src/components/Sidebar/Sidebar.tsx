"use client";

import { Logo } from "@/components";
import { useUser } from "@auth0/nextjs-auth0/client";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/legacy/image";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";

const Sidebar = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState<any[]>([]);

  useLayoutEffect(() => {
    const getPostList = async () => {
      try {
        const response = await fetch("/api/posts").then((res) => res.json());
        setPosts(response);
      } catch (error) {}
    };
    getPostList();
  }, []);
  return (
    <div className="flex flex-col text-white overflow-hidden bg-stone-900">
      <div className="px-2">
        <div className="py-2">
          <Logo />
        </div>
        <Link
          href="/post/new"
          className="bg-green-500 tracking-wider w-full text-center text-white font-bold cursor-pointer uppercase px-4 py-2 rounded-md hover:bg-green-600 transition-colors block"
        >
          New post
        </Link>
      </div>
      <div className="px-2 py-2 flex-1 flex flex-col overflow-auto gap-2">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/post/${post.id}`}
            className={`block p-3 rounded-md cursor-pointer bg-gray-800 hover:bg-gray-800 w-full truncate`}
            title={post.topic}
          >
            {post.topic}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-2 border-t border-t-gray-300 h-20 px-2">
        {!!user ? (
          <>
            <div className="min-w-[50px]">
              <Image
                src={user.picture as string}
                alt={user.name as string}
                height={50}
                width={50}
                priority={true}
                className="rounded-full"
              />
            </div>
            <div className="flex-1">
              <div className="font-bold">{user.email}</div>
              <Link
                href="/api/auth/logout"
                className="text-sm hover:text-green-500"
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
              </Link>
            </div>
          </>
        ) : (
          <>
            <Link href="/api/auth/login">Login</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
