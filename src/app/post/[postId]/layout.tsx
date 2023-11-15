import { ReactNode, Suspense } from "react";
import Loading from "./loading";

type TPostDetailLayoutProps = {
  children: ReactNode;
};

const PostDetailLayout = ({ children }: TPostDetailLayoutProps) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default PostDetailLayout;
