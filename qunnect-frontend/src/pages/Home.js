'use client'

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../features/posts/postSlice";
import { ProfileCard } from "../components/ProfileCard";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";
import AddFriendCard from "../components/AddFriendCard";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { Bell, MessageCircle, Search, Users } from "lucide-react";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(getPosts())
      .unwrap()
      .then(() => setIsLoading(false));
  }, [dispatch]);

  return (
    (<div className="bg-background min-h-screen">
  
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Left sidebar */}
          <div className="hidden lg:block w-1/4">
            <ProfileCard user={user} />
          </div>

          {/* Main content */}
          <div className="flex-1 space-y-6">
            <CreatePost />
            {isLoading ? (
              <Card>
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ) : (
              posts?.map((post) => <PostCard key={post?._id} post={post} />)
            )}
          </div>

          {/* Right sidebar */}
          <div className="hidden xl:block w-1/4">
            <Card>
              <CardHeader>
                <CardTitle>Add to your feed</CardTitle>
              </CardHeader>
              <CardContent>
                {/* <AddFriendCard /> */}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>)
  );
};

export default Home;