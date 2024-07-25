import React, { useEffect, useState } from "react";
import axios from "axios";
import { PostWithCount } from "./types";
import { Button } from "@/components/ui/button";
import SinglePost from "../components/admin-page-post";
import { InfinitySpin } from "react-loader-spinner";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Props {
  fingerprint: number;
}

export default function Posts({ fingerprint }: Props) {
  const [posts, setPosts] = useState<PostWithCount[] | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }user/post?user_fingerprint=${fingerprint}`,
        { headers: getAuthHeader() }
      )
      .then((response) => {
        setPosts(response.data);
      })
      .catch(() => {
        toast.error("Error fetching posts:");
      });
  }, [fingerprint]);

  const createFeedback = () => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}post`,
        {
          content: description,
          title: title
        },
        { headers: getAuthHeader() }
      )
      .then((response) => {
        toast.success("The feedback is created");
        setPosts(response.data);
      })
      .catch(() => {
        toast.error("Error creating post");
      })
      .finally(() => {
        setDescription("");
        setTitle("");
      });
  };

  return (
    <div className="flex justify-center w-full h-screen">
      <div className="flex flex-col w-full md:w-4/6 h-full">
        <div className="mt-2 pb-6 md:h-24 shadow-lg flex flex-row items-center justify-between pr-3 md:pb-4 md:pt-10  bg-white">
          <p className="text-xl font-bold md:pl-5">
            Welcome to Anonymous Feedback
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline"> + Create</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>New Feedback</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="">
                  <Label htmlFor="title" className="pl-1">
                    Title
                  </Label>
                  <Input
                    id="title"
                    className="w-full mt-2"
                    value={title}
                    onChange={(e: {
                      target: { value: React.SetStateAction<string> };
                    }) => setTitle(e.target.value)}
                  />
                </div>
                <div className="">
                  <Label htmlFor="description" className="pl-1">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    className="w-full mt-2"
                    value={description}
                    onChange={(e: {
                      target: { value: React.SetStateAction<string> };
                    }) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit" onClick={createFeedback}>
                    Save
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {posts ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 ">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-3 border-gray-200 border-2 rounded-md cursor-pointer hover:scale-[1.01]  bg-white"
                onClick={() => navigate(`/feedback/${post.id}`)}>
                <SinglePost post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-[80%] flex justify-center items-center border">
            <div className="text-center">
              <InfinitySpin width="100%" color="#4fa94d" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
