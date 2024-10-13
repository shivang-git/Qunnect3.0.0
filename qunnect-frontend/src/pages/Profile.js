import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getprofileUsers } from "../features/users/userSlice";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";
import ProfileBanner from "../components/ProfileBanner";
import EditProfile from "../components/EditProfile";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Briefcase, GraduationCap, MapPin, Link as LinkIcon } from "lucide-react";

const Profile = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const user = useSelector((state) => state.users.profileUser);
  const currentUser = useSelector((state) => state.auth.user.user); // Get the current logged-in user
  const { posts } = useSelector((state) => state.posts);
  

  
  const userPosts = posts.filter(post => post?.author?._id === user?._id);
  const isOwnProfile = currentUser?._id === user?._id;
   
  useEffect(() => {
    dispatch(getprofileUsers(slug));

  }, [dispatch, slug]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileBanner openEditprofile={setIsEditProfileOpen} user={user} />
        
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{user?.bio}</p>
                <ul className="mt-4 space-y-2">
                  {user?.company && (
                    <li className="flex items-center text-sm text-gray-600">
                      <Briefcase className="mr-2 h-4 w-4" />
                      {user.company}
                    </li>
                  )}
                  {user?.education && (
                    <li className="flex items-center text-sm text-gray-600">
                      <GraduationCap className="mr-2 h-4 w-4" />
                      {user.education}
                    </li>
                  )}
                  {user?.location && (
                    <li className="flex items-center text-sm text-gray-600">
                      <MapPin className="mr-2 h-4 w-4" />
                      {user.location}
                    </li>
                  )}
                  {user?.website && (
                    <li className="flex items-center text-sm text-gray-600">
                      <LinkIcon className="mr-2 h-4 w-4" />
                      <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {user.website}
                      </a>
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills & Endorsements</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Add skills content here */}
                <p className="text-sm text-gray-600">No skills added yet.</p>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {isOwnProfile && <CreatePost />}

            <Card>
              <CardContent className="p-0">
                <Tabs defaultValue="posts">
                  <TabsList className="w-full justify-start rounded-none border-b">
                    <TabsTrigger value="posts">Posts</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                  </TabsList>
                  <TabsContent value="posts" className="p-4">
                    {userPosts.length > 0 ? (
                      userPosts.map((post) => (
                        <div key={post?._id} className="mb-6">
                          <PostCard post={post} />
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 mt-4">No posts yet.</p>
                    )}
                  </TabsContent>
                  <TabsContent value="activity" className="p-4">
                    <p className="text-center text-gray-500">No recent activity.</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {isEditProfileOpen && 
      <EditProfile
isOpen={isEditProfileOpen}
onClose={() => setIsEditProfileOpen(false)} 
  initialValues={{
    firstName: currentUser.firstname,
    lastName: currentUser.lastname,
    bio: 'A short bio...',
    profilePhoto: currentUser.profilePhoto,
    backgroundPhoto: currentUser.ProfileBanner,
  }}
/>}
    </div>
  );
};

export default Profile;
