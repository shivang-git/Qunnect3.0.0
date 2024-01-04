import React from "react";
import { ProfileCard } from "../components/ProfileCard";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";
import AddFriendCard from "../components/AddFriendCard";
const Home = () => {
  return (
    <>
      <div className="home w-full px-0 bg-gray-100 lg:px-10  2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
        <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full">
          {/* left component */}
          <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto">
            <ProfileCard />
            <AddFriendCard />
          </div>
          {/* center component */}
          <div className="flex-1 h-full bg-primary px-5 flex flex-col gap-6 overflow-y-auto">
           
              <div class="col-span-2">
                <div class="pt-0">
                 <CreatePost/>
                </div>
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
              </div>
         
          </div>

          {/* Right component */}
          {/* <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto">
            
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Home;
