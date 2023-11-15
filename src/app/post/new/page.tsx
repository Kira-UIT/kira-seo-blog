"use client";

import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { faBrain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";

type TGeneratePost = {
  topic: string;
  keywords: string;
};

export default withPageAuthRequired(function ProfileApi() {
  const router = useRouter();
  const [dataBody, setDataBody] = useState<TGeneratePost>({
    topic: "",
    keywords: "",
  });
  const [generating, setGenerating] = useState(false);

  const generatePostHandler = async () => {
    setGenerating(true);
    try {
      const response = await fetch(`/api/generatePost`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(dataBody),
      });
      const json = await response.json();
      if (json?.postId) {
        router.push(`/post/${json.postId}`);
      }
    } catch (error) {
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="h-full overflow-hidden">
      {!!generating && (
        <div className="text-green-500 flex h-full animate-pulse w-full flex-col justify-center items-center">
          <FontAwesomeIcon icon={faBrain} className="text-8xl" />
          <h6>Generating...</h6>
        </div>
      )}
      {!generating && (
        <div className="w-full h-full flex flex-col overflow-auto">
          <form
            onSubmit={generatePostHandler}
            className="m-auto w-full max-w-screen-sm bg-slate-100 p-4 rounded-md shadow-md border border-slate-200"
          >
            <div>
              <label>
                <strong>Generate a blog post on the topic of:</strong>
              </label>
              <textarea
                className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm"
                value={dataBody.topic}
                onChange={(e) =>
                  setDataBody({ ...dataBody, topic: e.target.value })
                }
                maxLength={80}
              />
            </div>
            <div>
              <label>
                <strong>Targeting the following keywords:</strong>
              </label>
              <textarea
                className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm"
                value={dataBody.keywords}
                onChange={(e) =>
                  setDataBody({ ...dataBody, keywords: e.target.value })
                }
                maxLength={80}
              />
              <small className="block mb-2">
                Separate keywords with a comma
              </small>
            </div>
            <button
              type="submit"
              className="btn"
              disabled={!dataBody.topic.trim() || !dataBody.keywords.trim()}
            >
              Generate
            </button>
          </form>
        </div>
      )}
    </div>
  );
});
