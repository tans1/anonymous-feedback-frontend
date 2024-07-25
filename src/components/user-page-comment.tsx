// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import formatDate from "../pages/utils";

interface Props {
  content: string;
  date: string;
}

export default function CommentUI({ date, content }: Props) {
  return (
    <div className="mt-4 p-4 border rounded-lg shadow-md min-h-[80px] bg-white">
      <p className="text-base text-left text-wrap">{content}</p>
      <p className="text-right text-xs mt-3 text-gray-600">{formatDate(date)}</p>
    </div>
  );
}
