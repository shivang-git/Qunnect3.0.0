import React, { useEffect, useState } from "react";
import { ProfileCard } from "../components/ProfileCard";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";
import AddFriendCard from "../components/AddFriendCard";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../features/posts/postSlice";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
 
  const { user } = useSelector((state) => state.auth);
  
  const { posts } = useSelector((state) => state.posts);
  
  const dispatch = useDispatch();

  useEffect(() => {
      setIsLoading(isLoading);
      dispatch(getPosts())
        .unwrap()
        .then(() => setIsLoading(false));
  }, [ dispatch,isLoading]);

  return (
    <>
   
        <div className="home w-full  px-0 bg-gray-100 lg:px-10  2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
          <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full">
            {/* left component */}
            <div className="hidden w-1/4 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto">
              <ProfileCard user={user} />
              <AddFriendCard />
            </div>
            {/* center component */}
            <div className="flex-1 h-full bg-primary px-5 flex flex-col gap-6 overflow-y-auto">
              <div className="pt-0">
                <CreatePost />
              </div>

              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <div>
                  {" "}
                  {posts?.map((post) => (
                    <PostCard key={post?._id} post={post} user={user} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right component */}
          {/* <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto">
            
          </div> */}
        </div>
    </>
  );
};

export default Home;
