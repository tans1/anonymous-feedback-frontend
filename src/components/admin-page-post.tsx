import { PostWithCount } from "../pages/types";
import formatDate from "../pages/utils";

interface Props {
  post: PostWithCount;
}
export default function SinglePost({ post }: Props) {
  return (
    <div className="w-full">
      <p className="text-left">{post.title}</p>
      <div className="flex flex-row justify-between items-center">
        <div className="w-1/2">
        <p className="text-left text-xs mt-3 text-gray-600">{formatDate(post.created_at)}</p>
        </div>
        <div className="w-1/2">
          <p className="text-right text-xs mt-3 text-gray-600">comments : {post.commentsCount}</p>
        </div>
      </div>
    </div>
  );
}
