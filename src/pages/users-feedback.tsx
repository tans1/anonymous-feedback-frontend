import axios from "axios";
import { Comment, Post } from "./types";
import { SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import CommentUI from "../components/user-page-comment";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { InfinitySpin, ThreeDots } from "react-loader-spinner";
import { LinearGradient } from "react-text-gradients";
interface Props {
  fingerprint: number;
}

export default function Users({ fingerprint }: Props) {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const { postId } = useParams<{ postId: string }>();
  const [creatingComment, setCreatingComment] = useState<boolean>(false);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }post/${postId}?user_fingerprint=${fingerprint}`,
        { headers: getAuthHeader() }
      )
      .then((response) => {
        setPost(response.data);
        setComments(response.data["comments"]);
      })
      .catch(() => {
        toast.error("Error during login:");
      });
  }, [fingerprint, postId]);

  const createComment = () => {
    if (newComment.length > 0) {
      setCreatingComment(true);
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}comment`,
          {
            content: newComment,
            user_fingerprint: fingerprint,
            postId: postId
          },
          { headers: getAuthHeader() }
        )
        .then((response) => {
          toast.success("The comment is created");
          setPost(response.data);
          setComments(response.data.comments);
        })
        .catch(() => {
          toast.error("Error during login:");
        })
        .finally(() => {
          setCreatingComment(false);
          setNewComment("");
        });
    }
  };
  return (
    <div className="flex justify-center w-full h-screen pb-20">
      <div className="flex flex-col w-full md:w-4/6 h-full">
        <div className="mt-2">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-left">
              <LinearGradient
                gradient={["to right", "#7b1fa2 ,#f48fb1"]}
                className="text-3xl">
                {post?.title}
              </LinearGradient>
                
                </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-left text-wrap">{post?.content}</p>
            </CardContent>
          </Card>
        </div>
        <div className="flex-grow w-full mt-4 h-[300px] md:h-[300px] lg:h-[340px] xl:h-[380px]">
          {comments && post ? (
            <ScrollArea className="h-full">
              {comments?.map((item, index) => (
                <CommentUI
                  key={index}
                  content={item.content}
                  date={item.created_at}
                />
              ))}
            </ScrollArea>
          ) : (
            <div className="w-full h-full flex justify-center items-center border">
              <div className="text-center">
                <InfinitySpin width="100%" color="#4fa94d" />
              </div>
            </div>
          )}
        </div>
        <div className="sticky bottom-10 w-full bg-white pt-5">
          <div className="grid w-full gap-2">
            <Textarea
              placeholder="Type your message here."
              value={newComment}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setNewComment(e.target.value)
              }
            />
            {creatingComment ? (
              <div className="flex justify-center items-center border border-gray-200 rounded-sm">
                <ThreeDots
                  visible={true}
                  height="50"
                  width="80"
                  color="#4fa94d"
                  radius="6"
                  ariaLabel="three-dots-loading"
                  wrapperClass=""
                />
              </div>
            ) : (
              <Button onClick={createComment}>Send message</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
